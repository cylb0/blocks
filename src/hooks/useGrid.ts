import { useEffect, useState } from 'react'
import { HEIGHT, initialGrid, fakeGrid } from '../constants/constants'
import { Block, Empty, GridContent, Player } from '../types'

export const useGrid = (player:Player):[GridContent, React.Dispatch<React.SetStateAction<GridContent>>] => {
    const [grid, setGrid] = useState<GridContent>(fakeGrid)

    useEffect(() => {
        const updateGrid = (prevGrid:GridContent):GridContent => {

            const newGrid = prevGrid.map((row) => 
                row.map((cell) => (cell.sticks ? cell : {content: Empty.Empty, sticks: false }))
            )

            player.currentTetromino.shape.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    if (cell === 1) {
                        const blockName = Block[player.currentTetromino.name as keyof typeof Block]
                        newGrid[rowIndex + player.position.y][cellIndex + player.position.x] = { content: blockName, sticks: false }
                    }
                })
            })

            return newGrid
        }

        setGrid(prev => updateGrid(prev))

    }, [player])

    return [grid, setGrid]
}