type Props = {
    lines: number
}

export default function Lines({ lines = 15 }:Props) {
    return (
        <div id="lines" className="bg-[#89ac28]">
            <p>LINES</p>
            {lines}
        </div>
    )
}