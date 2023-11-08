import { useEffect, useState } from 'react'

import GameOver from './GameOver'
import Grid from './Grid'
import Level from './Level'
import Lines from './Lines'
import Next from './Next'
import Quit from './Quit'
import Score from './Score'
import Start from './Start'

import { useGrid, usePlayer } from '../hooks'

import { fakeGrid, initialGrid } from '../constants/constants'

export default function Tetris() {
    const player = usePlayer()
    const [grid, setGrid] = useState(fakeGrid)

    const [start, setStart] = useState(true)
    const [gameOver, setGameOver] = useState(false)
    const [score, setScore] = useState(0)
    const [level, setLevel] = useState(0)
    const [lines, setLines] = useState(0)

    const startGame = () => {
        setStart(true)
        setScore(0)
        setLevel(1)
        setLines(0)
    }

    const quitGame = () => {
        setStart(false)
        setScore(0)
        setLevel(0)
        setLines(0)
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
                        <Next next={player[0].nextTetromino} />
                    </aside>
                </>
            )}
        </div>
    )
}