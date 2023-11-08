import { TETROMINOS } from "../constants/tetrominos";
import { Block, Empty } from "../types";

type Props = {
    content: Block | Empty,
    row: number,
    index: number
}

export default function Cell({ content, row, index }: Props) {
    let cellStyle;

    if (content !== Empty.Empty) {
        cellStyle = TETROMINOS[content].color
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