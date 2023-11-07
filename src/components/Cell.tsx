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
            cellStyle = 'bg-[#000000]';
            break;
    }

    return (
        <div className={`${cellStyle} w-[20px] h-[20px] border border-slate-400`}></div>
    )
}