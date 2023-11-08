import { Block, GridContent, Empty } from "../types";Block.I

export const WIDTH:number = 10;

export const HEIGHT:number = 20;

export const initialGrid:GridContent = Array.from(Array(HEIGHT), () => Array(WIDTH).fill(Empty.Empty));

export const fakeGrid:GridContent = [
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Empty.Empty, Block.I, Block.T, Empty.Empty, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Empty.Empty, Block.O, Block.O, Block.I, Block.T, Block.T, Empty.Empty, Empty.Empty],
    [Empty.Empty, Empty.Empty, Block.J, Block.O, Block.O, Block.I, Block.T, Block.S, Block.S, Empty.Empty],
    [Empty.Empty, Empty.Empty, Block.J, Block.J, Block.J, Block.I, Block.S, Block.S, Empty.Empty, Empty.Empty],
]