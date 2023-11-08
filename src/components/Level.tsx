type Props = {
    level: number
}

export default function Level({ level = 1 }:Props) {
    return (
        <div className="bg-[#89ac28]">
            <p>LEVEL</p>
            {level}
        </div>
    )
}