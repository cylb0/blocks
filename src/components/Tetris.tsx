import { useEffect, useState } from 'react'

import GameOver from './GameOver'
import Grid from './Grid'
import Level from './Level'
import Lines from './Lines'
import Next from './Next'
import Score from './Score'
import Start from './Start'

import { useGrid, usePlayer } from '../hooks'

import { isColliding } from '../helpers/collisionHelper'

export default function Tetris () {
    const [player, updatePlayerPosition] = usePlayer()
    const [grid, setGrid] = useGrid(player)

    const [start, setStart] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(0)
    const [lines, setLines] = useState(0)

    useEffect(() => {
        window.addEventListener('keydown', move)
        
        return () => {
            window.removeEventListener('keydown', move)
        }
    }, [player])

    const startGame = () => {
        setStart(true)
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
        }
    }

    const changePosition = (direction:number) => {
        if(!isColliding(player, grid, {x: direction, y: 0})) {
            updatePlayerPosition({ x: direction, y: 0 })
        }
    }

    const dropPosition = () => {
        if(!isColliding(player, grid, {x: 0, y: 1})) {
            updatePlayerPosition({x: 0, y: 1})
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
                    </aside>
                </>
            )}
        </div>
    )
}