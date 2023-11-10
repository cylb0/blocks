type Props = {
    startGame: () => void
}

export default function Start({ startGame }:Props) {
    
    const handleClick = () => {
        startGame()
    }

    return (
        <div className="w-full h-full bg-quaternary">
            <div className="h-[33%] text-5xl flex justify-center items-center">TETRIS</div>
            <div className="h-[34%]">
                <img src="/background.png" alt="background" className="object-cover"/>
            </div>
            <div className="h-[33%] flex flex-col justify-center items-center">
                <button onClick={handleClick} className="hover:text-white">
                    Start game
                </button>
                <p>Cylb - 2023</p>
            </div>
        </div>
    )
}