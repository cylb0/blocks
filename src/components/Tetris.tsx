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
import { FRAME_RATE, initialGrid, scores, speedUp } from '../constants/constants'
import { rotate } from '../helpers/tetrominoHelper'
import { useInterval } from '../hooks/useInterval'

export default function Tetris () {
    const [start, setStart] = useState(true)
    const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer()
    const [grid, setGrid, checkCompleteRows] = useGrid(player, resetPlayer)
    const [lines, setLines] = useState(0)
    const [score, setScore] = useState(0)
    const [level] = useLevel(lines)
    const [tick, setTick] = useTickTimer(level)
    const [gameOver, setGameOver] = useState(false)

    useEffect(() => {
        if (speedUp[level as keyof typeof speedUp]) {
            setTick(Math.floor((speedUp[level as keyof typeof speedUp] / FRAME_RATE)*1000))
        }
    }, [level, tick])

    useEffect(() => {
        window.addEventListener('keydown', move)
        
        return () => {
            window.removeEventListener('keydown', move)
        }
    }, [player.position])

    useEffect(() => {
        const completeLines = checkCompleteRows()
        if(completeLines > 0) {
            setLines(lines + completeLines)
            setScore(score + (level === 0 ? scores[completeLines] : (level + 1) * scores[completeLines]))
        } 
    }, [player.position])

    useInterval(() => dropPosition(), tick, gameOver)

    const startGame = () => {
        setStart(true)
        setGameOver(false)
        setGrid(initialGrid)
        resetPlayer()
        setLines(0)
        setScore(0)
    }

    const quitGame = () => {
        setStart(false)
    }

    const move = (e:KeyboardEvent) => {
        if (gameOver) {
            if (e.key === ' ') {
                startGame()
            }
            return
        }

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
            case 's':
                rotateBlock(-1)
                break
            case 'd':
                rotateBlock(1)
                break
            default: 
                break
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

    const rotateBlock = (direction:number) => {
        const rotatedPlayer = { ...player }
        rotatedPlayer.currentTetromino = rotate(rotatedPlayer.currentTetromino, direction)

        if (!isColliding(rotatedPlayer, grid, { x: 0, y: 0})) {
            rotatePlayer(direction)
        }
    }

    return (
        <div className='relative'>
            <div className="flex w-[320px] h-[288px] bg-primary">
                {!start && 
                    <Start startGame={startGame} />
                }
                {start && (
                    <>
                        {gameOver ? (
                            <GameOver startGame={startGame} />
                        ) : (
                            <Grid currentGrid={grid} />
                        )}
                        <aside className="w-full flex flex-col items-center justify-between mt-7 mb-1">
                            <Score score={score} />
                            <Level level={level} />
                            <Lines lines={lines} />
                            <Next next={player.nextTetromino} />
                        </aside>
                    </>
                )}
            </div>
            <div className="absolute top-0 left-0 w-full h-full z-20 opacity-30 pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' width=\'4\' height=\'4\' fill=\'none\' stroke=\'%23c6cfa2\' stroke-width=\'0.5\'><path d=\'M0 0v10M10 0v10M0 0h10M0 10h10\'/></svg>")' }} />
        </div>
    )
}