import { useEffect, useState } from 'react'
import { FRAME_RATE, speedUp } from '../constants/constants'

export const useTickTimer = (level:number):[number] => {
    const [tick, setTick] = useState<number>(Number((speedUp[0] / FRAME_RATE).toFixed(3)))

    useEffect(() => {
        if (speedUp[level as keyof typeof speedUp]) {
            setTick(Number((speedUp[level as keyof typeof speedUp] / FRAME_RATE).toFixed(3)))
        }
    }, [level])

    return [tick]
}