import { TETROMINOS } from "../constants/tetrominos"
import { Tetromino } from "../types"

type Props = {
    next: Tetromino
}

const to4x4 = (shape: number[][]) => {
    const newGrid = Array.from({ length: 4}, () => Array(4).fill(0))

    shape.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            newGrid[rowIndex + (shape.length === 3 ? 1 : 0)][cellIndex] = cell
        })
    })

    return newGrid
}

export default function Next({ next }:Props) {

    const displayGrid = to4x4(next.shape)

    return (
        <div className="bg-quaternary p-1 rounded-xl border-2 border-primary self-end me-2">
            <div className="bg-quaternary p-1 border-2 border-primary rounded-xl">
                {displayGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, cellIndex) => (
                            <div 
                                key={`${rowIndex}-${cellIndex}`}
                                style={{ background: cell !== 0 ? next.color : '' }}
                                className={`h-[14px] w-[14px] text-[8px] flex justify-center items-center`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}