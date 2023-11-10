type Props = {
    score: number,
}

export default function Score({ score = 1318 }:Props) {
    return (
        <div className="w-full h-[20%] bg-quaternary border-y border-tertiary text-end relative">
            <div className="absolute top-[-30%] left-0 w-full z-10 flex justify-center h-3/5">
                <div className="bg-quaternary p-1 rounded w-[80%]">
                    <div className="border-2 border-tertiary rounded flex justify-center">
                        <span className="text-primary tracking-[0.2rem]">SCORE</span>
                    </div>
                </div>
            </div>
            <div className="h-[30%] bg-tertiary border-y border-quaternary my-1 relative"></div>
            <div className="h-[50%] box-border border-y-2 border-tertiary pb-2">
                <span className="me-3 text-primary">{score}</span>
            </div>
        </div>
    )
}