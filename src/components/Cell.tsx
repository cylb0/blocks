import { TETROMINOS } from "../constants/tetrominos";
import { CellContent, Empty } from "../types";

type Props = {
    content: CellContent,
    row: number,
    index: number,
    lineHeight: number
}

export default function Cell({ content, row, index, lineHeight }: Props) {
    let cellStyle;

    if (content.content !== Empty.Empty) {
        cellStyle = TETROMINOS[content.content].color
    } else {
        cellStyle = "transparent"
    }

    return (
        <div 
            id={`cell-${row}-${index}`}
            style={{ background: cellStyle, width: `${lineHeight}px`, aspectRatio: `1 / 1`}}
            className={`text-[6px] flex justify-center items-center`}></div>
    )
}