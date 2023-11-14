import { GridContent } from "../types"
import Cell from "./Cell"

type Props = {
    currentGrid: GridContent,
    lineHeight: number
}

export default function Grid({ currentGrid, lineHeight }:Props) {
    return (
        <div id="grid" className={`h-full bg-tertiary ms-4 flex justify-center border-x-2 border-quaternary`}>
            <div className="bg-quaternary h-full flex flex-col-reverse">
                <div className="inline-block w-full h-full">
                    {currentGrid.map((row, rowIndex) => (
                        <div 
                            id={`row-${rowIndex}`} 
                            key={`row${rowIndex}`} 
                            className={`flex`}
                        >
                            {row.map((cell, cellIndex) => (
                                <Cell 
                                    key={`cell${cellIndex}`}
                                    content={cell}
                                    row={rowIndex}
                                    index={cellIndex}
                                    lineHeight={lineHeight} />
                            ))} 
                        </div>     
                    ))}
                </div>
            </div>
        </div>
        
    )
}