import { useEffect, useRef } from 'react'

export const useInterval = (callback:() => void, delay:number, gameOver: boolean) => {
    const savedCallback = useRef<() => void | null>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            if (savedCallback.current)
            savedCallback.current()
        }
        if (delay !== null && !gameOver) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay, gameOver])
}