type Props = {
    level: number
}

export default function Level({ level = 1 }:Props) {
    return (
        <div className="bg-quaternary p-1 rounded-xl border-2 border-primary w-[80%]">
            <div className="bg-quaternary px-1 border-2 border-tertiary rounded-lg">
                <p className="text-center text-primary tracking-[0.2rem]">LEVEL</p>
                <p className="text-end me-3">{level}</p>
            </div>
        </div>
    )
}