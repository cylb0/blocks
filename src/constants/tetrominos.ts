import { Tetromino } from "../types"

export const TETROMINOS:Record<string, Tetromino> = {
    I: {
        name: "I",
        shape: [
            [0, 0, 0, 0],
            [1, 1, 1, 1],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ], 
        color: "#00ffff"
    },
    J: {
        name: "J",
        shape: [
            [1, 0, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: "#0000ff"
    },
    L: {
        name: "L",
        shape: [
            [0, 0, 1],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: "#ff7f00"
    },
    O: {
        name: "O",
        shape: [
            [0, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0]
        ],
        color: "#ffff00"
    },
    S: {
        name: "S",
        shape: [
            [0, 1, 1],
            [1, 1, 0],
            [0, 0, 0]
        ],
        color: "#00ff00"
    },
    Z: {
        name: "Z",
        shape: [
            [1, 1, 0],
            [0, 1, 1],
            [0, 0, 0]
        ],
        color: "#ff0000"
    },
    T: {
        name: "T",
        shape: [
            [0, 1, 0],
            [1, 1, 1],
            [0, 0, 0]
        ],
        color: "#800080"
    }
}

export const randomTetromino = () => {
    const tetroKeys = Object.keys(TETROMINOS)
    const randomKey = tetroKeys[Math.floor(Math.random() * tetroKeys.length)]
    return TETROMINOS[randomKey]
}