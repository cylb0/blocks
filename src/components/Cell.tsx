import { TETROMINOS } from "../constants/tetrominos";
import { Block, CellContent, Empty } from "../types";

type Props = {
    content: CellContent,
    row: number,
    index: number
}

export default function Cell({ content, row, index }: Props) {
    let cellStyle;

    if (content.content !== Empty.Empty) {
        cellStyle = TETROMINOS[content.content].color
    } else {
        cellStyle = "transparent"
    }

    return (
        <div 
            id={`cell-${row}-${index}`}
            style={{ background: cellStyle}}
            className="w-[14px] h-[14px] text-[6px] flex justify-center items-center"></div>
    )
}