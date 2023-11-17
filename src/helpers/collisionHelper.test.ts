import { isColliding } from "./collisionHelper";
import { Block, Empty, GridContent, Player } from "../types";

let mockGridContent:GridContent = Array.from({length: 3}, () => 
    Array(3).fill({ content: Empty.Empty, sticks: false })
);
let mockPlayer:Player = {
    position: {x:0, y:0},
    currentTetromino: {name: 'I', shape: [[0,1,0], [0,1,0]], color: 'red'},
    nextTetromino: {name: 'I', shape: [[0,1,0], [0,1,0]], color: 'red'},
    collides: false
};

beforeEach(() => {
    mockPlayer.position = {x:0, y:0};
});

describe('isColliding', () => {
    test('should return false when there is no collision going down', () => {
        const movement = {x:0, y:1};
        const result = isColliding(mockPlayer, mockGridContent, movement);
        expect(result).toBe(false);
    });
    
    test('should return false when there is no collision going towards the side border', () => {
        const movement = {x:1, y:0};
        const result = isColliding(mockPlayer, mockGridContent, movement);
        expect(result).toBe(false);
    });
    
    test('should return true when colliding side border', () => {
        const movement = {x: 2, y: 0};
        const result = isColliding(mockPlayer, mockGridContent, movement);
        expect(result).toBe(true);
    });
    
    test('should return true when colliding bottom line', () => {
        const movement = {x: 0, y: 2};
        const result = isColliding(mockPlayer, mockGridContent, movement);
        expect(result).toBe(true);
    });
    
    test('should return true when colliding an occupied cell', () => {
        mockGridContent[0][0] = { content: Block.O, sticks: true };
        const movement = {x: -1, y: 0};
        const result = isColliding(mockPlayer, mockGridContent, movement);
        expect(result).toBe(true);
    });
})