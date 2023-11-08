import { Block, EmptyCell } from "../types"

type Props = {
    content: string
}

export default function Cell({ content }: Props) {

    let cellStyle;

    switch (content) {
        case Block.I: 
            cellStyle = 'bg-[#00ffff]';
            break;
        case Block.J:
            cellStyle = 'bg-[#0000ff]'
            break;
        case Block.L: 
            cellStyle = 'bg-[#ffa500]';
            break;
        case Block.O:
            cellStyle = 'bg-[#ffff00]'
            break;
        case Block.S: 
            cellStyle = 'bg-[#00ff00]';
            break;
        case Block.Z:
            cellStyle = 'bg-[#ff0000]'
            break;
        case Block.T    : 
            cellStyle = 'bg-[#9370db]';
            break;
        case EmptyCell.Empty   : 
            cellStyle = 'bg-transparent';
            break;
    }

    return (
        <div className={`${cellStyle} w-[14px] h-[14px] border box-border`}></div>
    )
}