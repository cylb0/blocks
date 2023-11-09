import { useEffect, useState } from "react"
import { randomTetromino } from "../constants/tetrominos"
import { Player } from "../types"
import { WIDTH } from "../constants/constants"

export const usePlayer = ():[Player, ({x, y}:{x: number, y:number}) => void] => {

    const [player, setPlayer] = useState<Player>({
        position: { x: WIDTH / 2 - 2, y: 0 },
        currentTetromino: randomTetromino(),
        nextTetromino: randomTetromino()
    })
    
    useEffect(() => {
        console.log('player pos: ', player.position.y, player.position.x)
    }, [player])

    const updatePlayerPosition = ({ x, y }: {x: number, y: number}) => {
        setPlayer(prevState => ({
            ...prevState,
            position: { x: (prevState.position.x + x), y: (prevState.position.y + y)}
        }))
    }

    return [ player, updatePlayerPosition ]
}