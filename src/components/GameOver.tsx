type Props = {
    startGame: () => void
}

export default function GameOver({ startGame }:Props) {

    const handleClick = () => {
        startGame()
    }

    return (
        <div className="bg-quaternary flex flex-col justify-around items-center h-full ms-4 border-x-2 border-[#89ac28]">
            <div className="border-4 border-primary rounded-xl p-1">
                <div className="border-2 border-tertiary rounded-lg p-4">
                    <p className="text-primary underline decoration-tertiary">GAME</p>
                    <p className="text-primary underline decoration-tertiary mt-2">OVER</p>
                </div>
            </div>
            <div onClick={handleClick} className="flex flex-col w-full gap-2 text-primary hover:text-secondary hover:cursor-pointer">
                <p className="underline decoration-primary decoration-dotted ms-5">PLEASE</p>
                <p className="underline decoration-primary decoration-dotted ms-12">TRY</p>
                <p className="underline decoration-primary decoration-dotted ms-20">AGAIN&#9825;</p>
            </div>
        </div>
    )    
}