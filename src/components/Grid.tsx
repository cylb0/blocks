import { Empty, GridContent } from "../types"
import Cell from "./Cell"
import { HEIGHT, WIDTH } from "../constants/constants"

type Props = {
    currentGrid: GridContent
}

export default function Grid({ currentGrid }:Props) {
    return (
        <div className="bg-tertiary h-full min-w-[170px] ms-4 flex justify-center border-x-2 border-primary">
            <div className="bg-primary h-full flex flex-col-reverse">
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