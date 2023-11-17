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

export const to4x4 = (shape: number[][]): number[][] => {
    // If parameter is bigger, throw error
    if (shape.length > 4 || shape.some(row => row.length > 4)) {
        throw new Error('Parameter is more than 4x4 which is too big')
    }
    // If parameter is already 4x4, return parameter
    if (shape.length === 4 && !shape.some(row => row.length !== 4)) {
        return shape
    }
    // Else convert it
    const newGrid = Array.from({ length: 4}, () => Array(4).fill(0))

    let cols = shape[0].length

    shape.forEach((row, rowIndex) => {
        row.forEach((cell, cellIndex) => {
            newGrid[rowIndex + 1][cellIndex + (cols < 3 ? 1 : 0)] = cell
        })
    })
    return newGrid
}