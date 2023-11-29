import { useEffect, useRef } from 'react'

export const useTickInterval = (callback:() => void, delay:number, gameOver: boolean, paused: boolean, downPressed: boolean) => {
    const savedCallback = useRef<() => void | null>()

    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    useEffect(() => {
        function tick() {
            if (savedCallback.current)
            savedCallback.current()
        }
        if (delay !== null && !gameOver && !paused && !downPressed) {
            const id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay, gameOver, paused, downPressed])
}