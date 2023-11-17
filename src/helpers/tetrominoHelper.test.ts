import { rotate } from "./tetrominoHelper";

test('rotate should return the same tetromino for O', () => {
    const tetromino = {name: 'O', shape: [[0, 1, 0]], color: "red"}
    const rotatedTetromino = rotate(tetromino, 1)
    expect(rotatedTetromino).toEqual(tetromino)
})

test('rotate should return a 90° rotated tetromino', () => {
    const tetromino = {name: 'L', shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]], color: "red"}
    const expectedTetromino = {name: 'L', shape: [[0, 0, 0], [1, 1, 1], [1, 0, 0]], color: "red"}
    const rotatedTetromino = rotate(tetromino, 1)
    expect(rotatedTetromino).toEqual(expectedTetromino)
})

test('rotate should return a -90° rotated tetromino', () => {
    const tetromino = {name: 'L', shape: [[0, 1, 0], [0, 1, 0], [0, 1, 1]], color: "red"}
    const expectedTetromino = {name: 'L', shape: [[0, 0, 1], [1, 1, 1], [0, 0, 0]], color: "red"}
    const rotatedTetromino = rotate(tetromino, -1)
    expect(rotatedTetromino).toEqual(expectedTetromino)
})

test('rotate should return a 90° rotated tetromino even with different dimensions', () => {
    const tetromino = {name: 'X', shape: [[0, 1, 0], [0, 1, 0]], color: "red"}
    const expectedTetromino = {name: 'X', shape: [[0, 0], [1, 1], [0, 0]], color: "red"}
    const rotatedTetromino = rotate(tetromino, -1)
    expect(rotatedTetromino).toEqual(expectedTetromino)
})