import { useEffect, useState } from 'react'

export const useLevel = (lines:number):[number] => {
    const [level, setLevel] = useState(0)

    useEffect(() => {
        setLevel(Math.floor(lines / 10))
    }, [lines])

    return [level]
}