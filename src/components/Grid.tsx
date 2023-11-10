import { GridContent } from "../types"
import Cell from "./Cell"

type Props = {
    currentGrid: GridContent
}

export default function Grid({ currentGrid }:Props) {
    return (
        <div className="bg-tertiary h-full min-w-[170px] ms-4 flex justify-center border-x-2 border-quaternary">
            <div className="bg-quaternary h-full flex flex-col-reverse">
                <div className="inline-block">
                    {currentGrid.map((row, rowIndex) => (
                        <div 
                            id={`row-${rowIndex}`} 
                            key={`row${rowIndex}`} 
                            className={`flex ${rowIndex < 2 ? 'hidden' : ''}`}
                        >
                            {row.map((cell, cellIndex) => (
                                <Cell 
                                    key={`cell${cellIndex}`}
                                    content={cell}
                                    row={rowIndex}
                                    index={cellIndex} />
                            ))} 
                        </div>     
                    ))}
                </div>
            </div>
        </div>
        
    )
}