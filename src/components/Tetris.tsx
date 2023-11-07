import { useState } from 'react'

import Grid from './Grid'
import Screen from './Screen'
import Start from './Start'

import { initialGrid } from '../constants/constants'

export default function Tetris() {
    const [start, setStart] = useState(false)
    const [grid, setGrid] = useState(initialGrid)

    return (
        <>
            <Grid currentGrid={grid} />
            <aside>
                <Screen />
                <Start />
            </aside>
        </>
    )
}