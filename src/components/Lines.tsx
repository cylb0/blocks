type Props = {
    lines: number
}

export default function Lines({ lines = 15 }:Props) {
    return (
        <div className="bg-primary p-1 rounded">
            <div className="bg-primary p-1 border-2 border-tertiary rounded">
                <p>LINES</p>
                <p className="text-end me-3">{lines}</p>
            </div>
        </div>
    )
}