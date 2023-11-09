import { GridContent, Player } from "../types"

export const isColliding = (player:Player, grid:GridContent, movement:{x: number, y: number}):boolean => {
    const tetromino = player.currentTetromino.shape

    for (let rowIndex = 0 ; rowIndex < tetromino.length; rowIndex++) {
        for (let cellIndex = 0 ; cellIndex < tetromino[rowIndex].length ; cellIndex++) {
            if (tetromino[rowIndex][cellIndex] === 1) {
                if (!grid[player.position.y + rowIndex + movement.y] ||
                    !grid[player.position.y + rowIndex + movement.y][player.position.x + cellIndex + movement.x] ||
                    grid[player.position.y + rowIndex + movement.y][player.position.x + cellIndex + movement.x].sticks === true) {
                    return true
                }
            }
        }
    }

    return false
}