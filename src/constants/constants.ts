import { Block, GridContent, Empty } from "../types";Block.I

export const WIDTH:number = 10;

export const HEIGHT:number = 20;

export const initialGrid:GridContent = Array.from(Array(HEIGHT), () => Array(WIDTH).fill({ content: Empty.Empty, sticks: false }));

export const FRAME_RATE = 59.73;

export const speedUp:Record<number, number> = {
    0: 53,
    1: 49,
    2: 45,
    3: 41,
    4: 37,
    5: 33,
    6: 28,
    7: 22,
    8: 17,
    9: 11,
    10: 10,
    11: 9,
    12: 8,
    13: 7,
    14: 6,
    16: 5,
    18: 4,
    20: 3
}

export const scores:Record<number,number> = {
    1: 40,
    2: 100,
    3: 300,
    4: 1200
}