import { useEffect, useState } from 'react'
import { WIDTH, initialGrid } from '../constants/constants'
import { Block, Empty, GridContent, Player } from '../types'

export const useGrid = (player:Player, resetPlayer:() => void):[GridContent, React.Dispatch<React.SetStateAction<GridContent>>, () => number] => {
    const [grid, setGrid] = useState<GridContent>(initialGrid)

    useEffect(() => {
        const updateGrid = (prevGrid:GridContent):GridContent => {

            const newGrid = prevGrid.map((row) => 
                row.map((cell) => (cell.sticks ? cell : {content: Empty.Empty, sticks: false }))
            )

            player.currentTetromino.shape.forEach((row, rowIndex) => {
                row.forEach((cell, cellIndex) => {
                    if (cell === 1) {
                        const blockName = Block[player.currentTetromino.name as keyof typeof Block]
                        newGrid[rowIndex + player.position.y][cellIndex + player.position.x] = { content: blockName, sticks: player.collides ? true : false }
                    }
                })
            })

            if(player.collides) {
                resetPlayer()
            }

            return newGrid
        }

        setGrid(prev => updateGrid(prev))

    }, [player])

    const checkCompleteRows = ():number => {
        let lines = 0
        const toDelete:number[] = []
        grid.forEach((row, rowIndex) => {
            if (row.every(cell => (cell.content !== Empty.Empty) && (cell.sticks))) {
                lines++
                toDelete.push(rowIndex)
            }
        })
        deleteRows(toDelete)
        return lines
    }

    const deleteRows = (toDelete:number[]) => {
        setGrid((prevState) => {
            const newEmptyRows = Array(toDelete.length).fill(Array(WIDTH).fill({ content: Empty.Empty, sticks: false }))
            const newGrid = newEmptyRows.concat(prevState.filter((_, index) => !toDelete.includes(index)))
            return newGrid
        })
    }

    return [grid, setGrid, checkCompleteRows]
}