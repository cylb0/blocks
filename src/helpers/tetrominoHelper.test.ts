import { rotate, to4x4 } from "./tetrominoHelper";

describe('to4x4', () => {
    test('should throw an error when passed a parameter that is more than 4 by 4', () => {
        const shape:number[][] = [[0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0], [0, 0, 1, 0, 0]];
        expect(() => to4x4(shape)).toThrow(/Parameter is more than 4x4 which is too big/)
    })

    test('should return a correct 4x4 shape when passed a 3x3 tetromino shape', () => {
        const shape:number[][] = [[0, 1, 0], [0, 1, 0], [0, 1, 0]];
        const newShape:number[][] = to4x4(shape);
        const expectedShape:number[][] = [[0, 0, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0], [0, 1, 0, 0]];
        expect(newShape).toEqual(expectedShape); 
    });

    test('should return a correct 4x4 shape when passed a 2x2 tetromino shape', () => {
        const shape:number[][] = [[1, 1], [1, 1]];
        const newShape:number[][] = to4x4(shape);
        const expectedShape:number[][] = [[0, 0, 0, 0], [0, 1, 1, 0], [0, 1, 1, 0], [0, 0, 0, 0]];
        expect(newShape).toEqual(expectedShape); 
    });
})

describe('rotate', () => {
    test('rotate should return the same tetromino for O', () => {
        const tetromino = {name: 'O', shape: [[0, 1, 0]], color: "red"};
        const rotatedTetromino = rotate(tetromino, 1);
        expect(rotatedTetromino).toEqual(tetromino);
    });
    
    test('rotate should return a 90° rotated tetromino', () => {
        const tetromino = {name: 'L', shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]], color: "red"};
        const expectedTetromino = {name: 'L', shape: [[0, 0, 0], [1, 1, 1], [1, 0, 0]], color: "red"};
        const rotatedTetromino = rotate(tetromino, 1);
        expect(rotatedTetromino).toEqual(expectedTetromino);
    });
    
    test('rotate should return a -90° rotated tetromino', () => {
        const tetromino = {name: 'L', shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]], color: "red"};
        const expectedTetromino = {name: 'L', shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: "red"};
        const rotatedTetromino = rotate(tetromino, -1);
        expect(rotatedTetromino).toEqual(expectedTetromino);
    });
    
    test('rotate should return a 90° rotated tetromino even with different dimensions', () => {
        const tetromino = {name: 'X', shape: [[0, 1, 0], [0, 1, 0]], color: "red"};
        const expectedTetromino = {name: 'X', shape: [[0, 0], [1, 1], [0, 0]], color: "red"};
        const rotatedTetromino = rotate(tetromino, -1);
        expect(rotatedTetromino).toEqual(expectedTetromino);
    });
});
