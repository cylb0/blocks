import { useUnitContext } from "../contexts/useUnitContext"
import '../index.css?inline'

export default function Boot() {
    const unit = useUnitContext()

    return (
        <div className={`w-full h-full flex justify-center items-center bg-quaternary`}>
            <p style={{ fontSize: `${1.5 * unit}px` }} className={`text-primary text-center animate-slide`}>Morgan&#174;</p>
        </div>
    )
}