import { useState } from "react"
import { randomTetromino } from "../constants/tetrominos"
import { Tetromino } from "../types"

type Player = {
    position: {
        x: number,
        y: number
    },
    currentTetromino: Tetromino,
    nextTetromino: Tetromino,
    border: boolean
}

export const usePlayer = () => {
    const [player, setPlayer] = useState<Player>({
        position: { x: 0, y: 0},
        currentTetromino: randomTetromino(),
        nextTetromino: randomTetromino(),
        border: false    
    })

    return [player]
}