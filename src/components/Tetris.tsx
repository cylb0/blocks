import { useEffect, useState } from 'react'

import GameOver from './GameOver'
import Grid from './Grid'
import Level from './Level'
import Lines from './Lines'
import Next from './Next'
import Score from './Score'
import Start from './Start'

import { useGrid, usePlayer, useLevel, useTickTimer } from '../hooks'

import { isColliding } from '../helpers/collisionHelper'
import { initialGrid } from '../constants/constants'

export default function Tetris () {
    const [start, setStart] = useState(true)
    const [player, updatePlayerPosition, resetPlayer] = usePlayer()
    const [grid, setGrid] = useGrid(player, resetPlayer)
    const [lines, setLines] = useState(0)
    const [score, setScore] = useState(0)
    const [level] = useLevel(lines)
    const [tick, setTick] = useTickTimer(level)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        window.addEventListener('keydown', move)
        
        return () => {
            window.removeEventListener('keydown', move)
        }
    }, [player])

    useEffect(() => {
        if(!gameOver) {
            const interval = setInterval(() => {
                dropPosition()
            }, tick)
    
            return () => clearInterval(interval)
        }
    }, [tick, gameOver, player, grid])

    const startGame = () => {
        setGameOver(false)
        setGrid(initialGrid)
        setStart(true)
        resetPlayer()
        setLines(0)
        setScore(0)
    }

    const quitGame = () => {
        setStart(false)
    }

    const move = (e:KeyboardEvent) => {
        if (!gameOver) {
            switch (e.key) {
                case 'ArrowLeft':
                    changePosition(-1)
                    break
                case 'ArrowRight': 
                    changePosition(1)
                    break
                case 'ArrowDown':
                    dropPosition()
                    break
            }
        } else {
            if (e.key === ' ') {
                startGame()
            }
        }
    }

    const changePosition = (direction:number) => {
        if(!isColliding(player, grid, {x: direction, y: 0})) {
            updatePlayerPosition({ x: direction, y: 0, collides: false })
        }
    }

    const dropPosition = () => {
        if(!isColliding(player, grid, {x: 0, y: 1})) {
            updatePlayerPosition({x: 0, y: 1, collides: false})
        } else {
            if (player.position.y < 1) {
                setGameOver(true)
            } 
            updatePlayerPosition({x: 0, y: 0, collides: true})
        }
    }

    return (
        <div className="flex w-[320px] h-[288px] bg-secondary">
            {!start && 
                <Start startGame={startGame}/>
            }
            {start && (
                <>
                    {gameOver ? (
                        <GameOver />
                    ) : (
                        <Grid currentGrid={grid} />
                    )}
                    <aside className="w-full flex flex-col items-center justify-around">
                        <Score score={score} />
                        <Level level={level} />
                        <Lines lines={lines} />
                        <Next next={player.nextTetromino} />
                        <p>{tick}</p>
                    </aside>
                </>
            )}
        </div>
    )
}