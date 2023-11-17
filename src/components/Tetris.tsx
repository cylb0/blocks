import { useEffect, useRef, useState } from 'react'

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
import { useUnitContext } from '../contexts/useUnitContext'
import Boot from './Boot'
import { useButtonsContext } from '../contexts/useButtonsContext'

export default function Tetris () {

    const { buttons, handleButtonPressed, resetButtons, dPad } = useButtonsContext()
    const keyPressed = useRef(false)

    const [booted, setBooted] = useState(true)
    const [start, setStart] = useState(true)
    const [player, updatePlayerPosition, resetPlayer, rotatePlayer] = usePlayer()
    const [grid, setGrid, checkCompleteRows] = useGrid(player, resetPlayer)
    const [lines, setLines] = useState(0)
    const [score, setScore] = useState(0)
    const [level] = useLevel(lines)
    const [tick, setTick] = useTickTimer(level)
    const [gameOver, setGameOver] = useState(false)
    const [dropBonus, setDropBonus] = useState(0)
    const [downPressed, setDownPressed] = useState(false)

    const unit = useUnitContext()

    useEffect(() => {
        if (speedUp[level as keyof typeof speedUp]) {
            setTick(Math.floor((speedUp[level as keyof typeof speedUp] / FRAME_RATE)*1000))
        }
    }, [level, tick])

    useEffect(() => {
        setTimeout(() => {
            setBooted(true)
        }, 3000)
    }, [booted])

    useEffect(() => {

        const handleKeyUp = () => {
            resetDropBonus()
            resetButtons()
            keyPressed.current = false
        }

        const handleKeyDown = (e:KeyboardEvent) => {
            e.preventDefault()

            if (gameOver) {
                if (e.key === ' ') {
                    startGame()
                }
                return
            }

            if (!keyPressed.current) {
                keyPressed.current = true
                switch (e.key) {
                    case 'ArrowUp': 
                        handleButtonPressed('arrowUp')
                        break
                    case 'ArrowLeft':
                        handleButtonPressed('arrowLeft')
                        break
                    case 'ArrowRight': 
                        handleButtonPressed('arrowRight')
                        break
                    case 'ArrowDown':
                        handleButtonPressed('arrowDown')
                        break
                    case 's':
                        handleButtonPressed('b')
                        break
                    case 'd':
                        handleButtonPressed('a')
                        break
                    default: 
                        break
                }
            }
        }

        window.addEventListener('keydown', handleKeyDown)
        window.addEventListener('keyup', handleKeyUp)
        
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            window.removeEventListener('keyup', handleKeyUp)
        }
    }, [player.position, gameOver])

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

    useEffect(() => {
        if (buttons.a) {
            rotateBlock(1)
        }
        if (buttons.b) {
            rotateBlock(-1)
        }
        if (buttons.arrowDown) {
            keyPressed.current = false
            dPad(0, -1)
            setDownPressed(true)
            dropPosition()
        }
        if (buttons.arrowLeft) {
            keyPressed.current = false
            dPad(-1, 0)
            changePosition(-1)
        }
        if (buttons.arrowRight) {
            keyPressed.current = false
            dPad(1, 0)
            changePosition(1)
        }
        if (buttons.arrowUp) {
            keyPressed.current = false
            dPad(0, 1)
        }
    }, [buttons])

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
            if (player.position.y < 1) {
                setGameOver(true)
            }
            keyPressed.current = true
            updatePlayerPosition({x: 0, y: 0, collides: true})
            setScore(score + dropBonus)
            resetDropBonus()
            setDownPressed(false)
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