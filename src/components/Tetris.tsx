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
import { useTickInterval } from '../hooks/useTickInterval'
import { useUnitContext } from '../contexts/useUnitContext'
import Boot from './Boot'
import { useButtonsContext } from '../contexts/useButtonsContext'
import Pause from './Pause'

export default function Tetris () {

    const { buttons, resetButton, resetButtons } = useButtonsContext()

    const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer()
    const [grid, setGrid, checkCompleteRows] = useGrid(player, resetPlayer)

    const [booted, setBooted] = useState<boolean>(false)
    const [start, setStart] = useState<boolean>(false)
    const [paused, setPaused] = useState<boolean>(false)
    const [gameOver, setGameOver] = useState<boolean>(false)

    const [lines, setLines] = useState<number>(0)
    const [score, setScore] = useState<number>(0)
    const [level] = useLevel(lines)
    const [tick, setTick] = useTickTimer(level)

    const [dropBonus, setDropBonus] = useState<number>(0)
    const [downPressed, setDownPressed] = useState<boolean>(false)
    const [leftPressed, setLeftPressed] = useState<boolean>(false)
    const [rightPressed, setRightPressed] = useState<boolean>(false)

    const unit = useUnitContext()

    // Set speed of the game
    useEffect(() => {
        if (speedUp[level as keyof typeof speedUp]) {
            setTick(Math.floor((speedUp[level as keyof typeof speedUp] / FRAME_RATE)*1000))
        }
    }, [level])

    // Booting screen
    useEffect(() => {
        setTimeout(() => {
            setBooted(true)
        }, 3000)
    }, [booted])

    // DROP MOVEMENT
    const handleDownPressed = () => {
        if (!downPressed) {
            setDownPressed(true)
            dropPosition()
        }
    }
    const handleDownReleased = () => {
        setDownPressed(false)
    }
    useEffect(() => {
        let downIntervalId:any
        if (downPressed) {
            downIntervalId = setInterval(() => {
                dropPosition()
            }, 40)
        }
        return () => clearInterval(downIntervalId)
    }, [downPressed, player])

    // MOVEMENT TO THE LEFT
    const handleLeftPressed = () => {
        if(!leftPressed) {
            setLeftPressed(true)
            changePosition(-1)
        }
    }
    const handleLeftReleased = () => {
        setLeftPressed(false)
    }
    useEffect(() => {
        let leftIntervalId:any
        if (leftPressed) {
            leftIntervalId = setInterval(() => {
                changePosition(-1)
            }, 200)
        }
        return () => clearInterval(leftIntervalId)
    }, [leftPressed, player])

    // MOVEMENT TO THE RIGHT
    const handleRightPressed = () => {
        if(!rightPressed) {
            setRightPressed(true)
            changePosition(1)
        }
    }
    const handleRightReleased = () => {
        setRightPressed(false)
    }
    useEffect(() => {
        let rightIntervalId:any
        if (rightPressed) {
            rightIntervalId = setInterval(() => {
                changePosition(1)
            }, 200)
        }
        return () => clearInterval(rightIntervalId)
    }, [rightPressed, player])

    // PAUSE
    useEffect(() => {
        setPaused(buttons.start)
    }, [buttons.start])

    // BUTTONS ACTION MAPPING
    useEffect(() => {
        if (buttons.b) {
            if (booted && start && !paused && !gameOver) {
                rotateBlock(-1)
                resetButton('b')
            }
        }
        if (buttons.a) {
            if (booted && !start || gameOver) {
                startGame()
            }
            if (booted && start && !paused && !gameOver) {
                rotateBlock(1)
                resetButton('a')
            }
            if (booted && start && paused) {
                togglePause()
                resetButton('start')
            }
        }
        if (buttons.arrowDown) {
            if (booted && start && !paused && !gameOver) {
                handleDownPressed()
            }
        } else {
            handleDownReleased()
        }
        if (buttons.arrowLeft) {
            if (booted && start && !paused && !gameOver) {
                handleLeftPressed()
            }
        } else {
            handleLeftReleased()
        }
        if (buttons.arrowRight) {
            if (booted && start && !paused && !gameOver) {
                handleRightPressed()
            }
        } else {
            handleRightReleased()
        }
        if (buttons.start) {
            if (booted && !start || gameOver) {
                startGame()
            }
        }
    }, [buttons, start, gameOver, paused])

    // Lines completes handler
    useEffect(() => {
        const completeLines = checkCompleteRows()
        if(completeLines > 0) {
            setLines(lines + completeLines)
            setScore(score + (level === 0 ? scores[completeLines] : (level + 1) * scores[completeLines]))
        } 
    }, [player.position])

    // Custom hook for ticks
    useTickInterval(() => dropPosition(), tick, gameOver, paused, downPressed)

    const startGame = () => {
        setGameOver(false)
        setPaused(false)
        setGrid(initialGrid)
        resetPlayer()
        resetButtons()
        setLines(0)
        setScore(0)
        setStart(true)
    }

    const togglePause = () => {
        setPaused(prevState => !prevState)
    }

    const resetDropBonus = () => {
        setDownPressed(false)
        setDropBonus(0)
    }

    const incrementDropBonus = () => {
        setDropBonus(dropBonus < 15 ? dropBonus + 1 : dropBonus)
    }

    const changePosition = (direction:number) => {
        if(!isColliding(player, grid, {x: direction, y: 0})) {
            updatePlayerPosition({ x: direction, y: 0, collides: false })
        }
    }

    const dropPosition = () => {
        if(!isColliding(player, grid, {x: 0, y: 1})) {
            if (downPressed) {
                incrementDropBonus()
            }
            updatePlayerPosition({x: 0, y: 1, collides: false})
        } else {
            resetButtons()
            if (player.position.y < 1) {
                setGameOver(true)
            }
            resetDropBonus()
            updatePlayerPosition({x: 0, y: 0, collides: true})
            setScore(score + dropBonus)
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
        <div className="relative" style={{ width: `${20 * unit}px`, height: `${18 * unit}px` }}>
            <div className={`flex w-full h-full bg-primary`}>
                {!booted &&
                    <Boot />
                }
                {booted && !start && 
                    <Start startGame={startGame} />
                }
                {start && (
                    <>
                        <div className="w-[60%] h-full">
                        {gameOver ? (
                            <GameOver startGame={startGame} />
                        ) : paused ? (
                            <Pause />
                        ) : (
                            <Grid currentGrid={grid} />
                        )}
                        </div>
                        <aside className="w-[40%] flex flex-col items-center justify-between mt-7 mb-1">
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