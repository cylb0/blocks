import { useState } from 'react'
import { fakeGrid, initialGrid } from '../constants/constants'
import { GridContent } from '../types'

export const useGrid = () => {
    const [grid, setGrid] = useState<GridContent>(fakeGrid)

    return [grid, setGrid]
}