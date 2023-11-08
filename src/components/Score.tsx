type Props = {
    score: number,
}

export default function Score({ score = 1318 }:Props) {
    return (
        <div>
            <div className="bg-[#89ac28]">SCORE</div>
            <div className="bg-[#89ac28]">{score}</div>
        </div>
    )
}