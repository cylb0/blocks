export enum Block {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    Z = 'Z',
    T = 'T'
}

export enum EmptyCell {
    Empty = 'E'
}
export type CellContent = Block | EmptyCell
export type GridContent = CellContent[][]