import { Tetromino } from "../types"

export const rotate = (tetromino:Tetromino, direction:number):Tetromino => {
    if (tetromino.name === 'O') {
        return tetromino
    }

    const shape = tetromino.shape
    const rows = shape.length
    const cols = shape[0].length

    const rotatedShape:number[][] = []

    if (direction === 1) {
        for (let i = 0 ; i < cols ; i++) {
            rotatedShape[i] = []
            for (let j = rows - 1 ; j >= 0 ; j--) {
                rotatedShape[i].push(shape[j][i])
            }
        }
    } else {
        for (let i = cols - 1 ; i >= 0 ; i--) {
            rotatedShape[cols - 1 - i] = []
            for (let j = 0 ; j < rows ; j++) {
                rotatedShape[cols - 1 - i].push(shape[j][i])
            }
        }
    }
    
    return {
        ...tetromino,
        shape: rotatedShape
    }
}