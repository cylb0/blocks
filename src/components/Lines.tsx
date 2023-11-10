type Props = {
    lines: number
}

export default function Lines({ lines = 15 }:Props) {
    return (
        <div className="bg-quaternary p-1 rounded-xl border-2 border-primary w-[80%]">
            <div className="bg-quaternary px-1 border-2 border-tertiary rounded-lg">
                <p className="text-center text-primary tracking-[0.2rem]">LINES</p>
                <p className="text-end me-3">{lines}</p>
            </div>
        </div>
    )
}