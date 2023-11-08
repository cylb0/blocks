type Props = {
    level: number
}

export default function Level({ level = 1 }:Props) {
    return (
        <div className="bg-primary p-1 rounded">
            <div className="bg-primary p-1 border-2 border-tertiary rounded">
                <p>LEVEL</p>
                <p className="text-end me-3">{level}</p>
            </div>
        </div>
    )
}