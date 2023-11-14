import { useUnitContext } from "../hooks/useUnitContext"

type Props = {
    level: number
}

export default function Level({ level }:Props) {
    const unit = useUnitContext()
    return (
        <div className="bg-quaternary rounded-xl border-2 border-primary w-[80%]">
            <div className="bg-quaternary border-2 border-tertiary rounded-lg">
                <p 
                    style={{ fontSize: `${0.8 * unit}px`}}
                    className="text-center text-primary">LEVEL</p>
                <p 
                    style={{ fontSize: `${1.2 * unit}px`, marginRight: `${unit}px` }}
                    className="text-primary text-end">{level}</p>
            </div>
        </div>
    )
}