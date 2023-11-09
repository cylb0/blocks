export enum Block {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    Z = 'Z',
    T = 'T',
}
export enum Empty {
    Empty = 'E'
}
export type CellContent = { content: Block | Empty, sticks: boolean }
export type GridContent = CellContent[][]

export type Tetromino = { name: string, shape: number[][], color: string }


export type Player = {
    position: {
        x: number,
        y: number
    },
    currentTetromino: Tetromino,
    nextTetromino: Tetromino,
    collides: boolean
}