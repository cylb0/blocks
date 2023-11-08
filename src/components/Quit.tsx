type Props = {
    quitGame: () => void
}

export default function Quit({ quitGame }:Props) {

    const handleClick = () => {
        quitGame()
    }

    return (
        <button 
            onClick={handleClick}
            className="bg-primary"
        >Quit</button>
    )
}