type Props = {
    next: string
}

export default function Next({ next = 'S' }:Props) {
    return (
        <div id="next" className="bg-[#89ac28]">
            {next}
        </div>
    )
}