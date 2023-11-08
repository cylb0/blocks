import { useState } from 'react'

import Grid from './Grid'
import Level from './Level'
import Lines from './Lines'
import Next from './Next'
import Quit from './Quit'
import Score from './Score'
import Start from './Start'

import { initialGrid } from '../constants/constants'

export default function Tetris() {
    const [start, setStart] = useState(false)
    const [grid, setGrid] = useState(initialGrid)
    const [score, setScore] = useState(-1)
    const [level, setLevel] = useState(-1)
    const [lines, setLines] = useState(-1)
    const [next, setNext] = useState('')

    const startGame = () => {
        setStart(true)
        setScore(0)
        setLevel(1)
        setLines(0)
    }

    const quitGame = () => {
        setStart(false)
        setScore(-1)
        setLevel(-1)
        setLines(-1)
        setNext('')
    }

    return (
        <div className="flex w-[320px] h-[288px] bg-[#214132]">
            {!start && 
                <Start startGame={startGame}/>
            }
            {start && (
                <>
                    <Grid currentGrid={grid} />
                    <aside>
                        <Score score={score} />
                        <Level level={level} />
                        <Lines lines={lines} />
                        <Next next={next} />
                        <Quit quitGame={quitGame} />
                    </aside>
                </>
            )}
        </div>
    )
}