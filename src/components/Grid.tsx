import { GridContent } from "../types"
import Cell from "./Cell"
import { HEIGHT } from "../constants/constants"

type Props = {
    currentGrid: GridContent
}

export default function Grid({ currentGrid }:Props) {
    return (
        <div className="bg-tertiary h-full min-w-[170px] ms-4 flex justify-center border-x-2 border-primary">
            <div className="bg-primary h-full flex flex-col-reverse">
                <div className="inline-block">
                    {currentGrid.map((row, rowIndex) => (
                        <div id={`row-${HEIGHT - rowIndex - 1}`} key={`row${rowIndex}`} className="flex">
                            {row.map((cell, cellIndex) => (
                                <Cell 
                                    key={`cell${cellIndex}`}
                                    content={cell}
                                    row={HEIGHT - rowIndex - 1}
                                    index={cellIndex} />
                            ))} 
                        </div>     
                    ))}
                </div>
            </div>
        </div>
        
    )
}