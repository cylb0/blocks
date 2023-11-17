import { Tetromino } from "../types"
import { useUnitContext } from "../contexts/useUnitContext"
import { to4x4 } from "../helpers/tetrominoHelper"

type Props = {
    next: Tetromino
}

export default function Next({ next }:Props) {
    const unit = useUnitContext()

    const displayGrid = to4x4(next.shape)

    return (
        <div className="bg-quaternary p-1 rounded-xl border-2 border-primary self-end me-2">
            <div className="bg-quaternary p-1 border-2 border-primary rounded-xl">
                {displayGrid.map((row, rowIndex) => (
                    <div key={rowIndex} className="flex">
                        {row.map((cell, cellIndex) => (
                            <div 
                                key={`${rowIndex}-${cellIndex}`}
                                style={{ background: cell !== 0 ? next.color : '', width: `${0.9 * unit}px`, aspectRatio: `1 / 1` }}
                                className={`text-[8px] flex justify-center items-center`}
                            ></div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}