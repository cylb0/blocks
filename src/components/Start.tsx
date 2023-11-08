type Props = {
    startGame: () => void
}

export default function Start({ startGame }:Props) {
    
    const handleClick = () => {
        startGame()
    }

    return (
        <div className="w-full h-full bg-[#89ac28]">
            <div id="title" className="h-[33%] text-3xl flex justify-center items-center">TETRIS</div>
            <div id="image" className="h-[34%] bg-black"></div>
            <div id="buttons" className="h-[33%] flex flex-col justify-center items-center">
                <button onClick={handleClick} className="hover:text-white">
                    Start game
                </button>
                <p>Cylb - 2023</p>
            </div>
        </div>
    )
}