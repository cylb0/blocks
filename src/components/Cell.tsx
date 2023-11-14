import { TETROMINOS } from "../constants/tetrominos";
import { CellContent, Empty } from "../types";
import { useUnitContext } from "../hooks/useUnitContext";

type Props = {
    content: CellContent,
    row: number,
    index: number
}

export default function Cell({ content, row, index }: Props) {
    const unit = useUnitContext()

    let cellStyle;

    if (content.content !== Empty.Empty) {
        cellStyle = TETROMINOS[content.content].color
    } else {
        cellStyle = "transparent"
    }

    return (
        <div 
            id={`cell-${row}-${index}`}
            style={{ background: cellStyle, width: `${0.9 * unit}px`, aspectRatio: `1 / 1`}}
            className={`text-[6px] flex justify-center items-center`}></div>
    )
}