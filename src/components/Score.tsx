import { useUnitContext } from "../hooks/useUnitContext"

type Props = {
    score: number
}

export default function Score({ score }:Props) {
    const unit = useUnitContext()

    return (
        <div className="w-full h-[20%] bg-quaternary border-y border-tertiary text-end relative">
            <div
                style={{ top: `${-unit}px` }} 
                className="absolute left-0 w-full z-10 flex justify-center h-3/5">
                <div className="bg-quaternary p-1 rounded w-[80%]">
                    <div className="border-2 border-tertiary rounded flex justify-center">
                        <span
                            style={{ fontSize: `${0.8 * unit}px` }} 
                            className="text-primary">SCORE</span>
                    </div>
                </div>
            </div>
            <div className="h-[30%] bg-tertiary border-y border-quaternary my-1 relative"></div>
            <div
                style={{ marginBottom: `${unit}px` }} 
                className="h-[50%] box-border border-y-2 border-tertiary">
                <span
                    style={{ fontSize: `${1.2 * unit}px`, marginRight: `${unit}px` }} 
                    className="text-primary">{score}</span>
            </div>
        </div>
    )
}