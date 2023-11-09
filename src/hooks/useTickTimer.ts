import { useEffect, useState } from 'react'
import { FRAME_RATE, speedUp } from '../constants/constants'

export const useTickTimer = (level:number):[number, React.Dispatch<React.SetStateAction<number>>] => {
    const [tick, setTick] = useState<number>(1000)

    useEffect(() => {
        if (speedUp[level as keyof typeof speedUp]) {
        setTick(Number(Math.floor((speedUp[level as keyof typeof speedUp] / FRAME_RATE)*1000)))
        }
    }, [level])

    return [tick, setTick]
}