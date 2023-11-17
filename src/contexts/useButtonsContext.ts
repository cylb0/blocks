import { createContext, useContext } from 'react'
import { ButtonsContextType } from '../types'

export const ButtonsContext = createContext<{buttons: ButtonsContextType, handleButtonPressed: (button:string) => void, resetButtons: () => void, dPad: (x: 0 | 1 | -1, y: 0 | 1 | -1) => void} | undefined>(undefined)

export function useButtonsContext() {
    const buttons = useContext(ButtonsContext)

    if (buttons === undefined) {
        throw new Error("useButtonsContext needs a ButtonsContext Provider")
    }

    return buttons
}