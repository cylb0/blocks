import { useEffect, useState } from "react"
import { randomTetromino } from "../constants/tetrominos"
import { Player } from "../types"
import { WIDTH } from "../constants/constants"

export const usePlayer = ():[Player, ({x, y, collides}:{x: number, y:number, collides:boolean}) => void, () => void] => {

    const [player, setPlayer] = useState<Player>({
        position: { x: WIDTH / 2 - 2, y: 16 },
        currentTetromino: randomTetromino(),
        nextTetromino: randomTetromino(),
        collides: false
    })
    
    useEffect(() => {
        console.log('player pos: ', player.position.y, player.position.x)
    }, [player])

    const updatePlayerPosition = ({ x, y, collides }: {x: number, y: number, collides: boolean}) => {
        setPlayer(prevState => ({
            ...prevState,
            position: { x: (prevState.position.x + x), y: (prevState.position.y + y)},
            collides: collides
        }))
    }

    const resetPlayer = () => {
        setPlayer(prevState => ({
            position: { x: WIDTH / 2 - 2, y: 0 },
            currentTetromino: prevState.nextTetromino,
            nextTetromino: randomTetromino(),
            collides: false
        }))
    }

    return [ player, updatePlayerPosition, resetPlayer ]
}