type Props = {
    score: number,
}

export default function Score({ score = 1318 }:Props) {
    return (
        <div>
            <div className="bg-primary">SCORE</div>
            <div className="bg-primary text-end">{score}</div>
        </div>
    )
}