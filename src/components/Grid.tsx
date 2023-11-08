import { GridContent } from "../types"
import Cell from "./Cell"

type Props = {
    currentGrid: GridContent
}

export default function Grid({ currentGrid }:Props) {
    return (
        <div className="bg-slate-400 w-[170px] h-full ms-4 flex justify-center border-x-2 border-[#89ac28]">
            <div className="bg-[#89ac28] h-full w-[140px] flex flex-col-reverse">
                <div className="inline-block">
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
            </div>
        </div>
        
    )
}