import { GridContent } from "../types"
import Cell from "./Cell"

type Props = {
    currentGrid: GridContent
}

export default function Grid({ currentGrid }:Props) {
    return (
        <div>
            {currentGrid.map((row, rowIndex) => (
                <div key={`row${rowIndex}`} className="flex">
                    {row.map((cell, cellIndex) => (
                        <Cell 
                            key={`cell${cellIndex}`}
                            content={cell} />
                    ))} 
                </div>     
            ))}
        </div>
    )
}