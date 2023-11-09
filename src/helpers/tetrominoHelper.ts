import { Tetromino } from "../types"

export const rotate = (tetromino:Tetromino, direction:number):Tetromino => {
    const shape = tetromino.shape
    const rotatedShape:number[][] = []

    if (direction === 1) {
        for (let i = 0 ; i < shape.length ; i++) {
            rotatedShape[i] = []
            for (let j = shape.length - 1 ; j >= 0 ; j--) {
                rotatedShape[i].push(shape[j][i])
            }
        }
    } else {
        for (let i = shape.length - 1 ; i >= 0 ; i--) {
            rotatedShape[shape.length - 1 - i] = []
            for (let j = 0 ; j < shape.length ; j++) {
                rotatedShape[shape.length - 1 - i].push(shape[j][i])
            }
        }
    }
    
    
    return {
        ...tetromino,
        shape: rotatedShape
    }
}