import { createContext, useContext } from 'react'

export const GameBoyContext = createContext<number | undefined>(undefined)

export function useUnitContext() {
    const unit = useContext(GameBoyContext)

    if (unit === undefined) {
        throw new Error("useUnitContext needs a GameBoyContext")
    }

    return unit
}