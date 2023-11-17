export default function Pause() {
    return (
        <div className="bg-quaternary flex flex-col justify-around items-center h-full ms-4 border-x-2 border-[#89ac28]">
            <div className="flex flex-col w-full gap-2 text-primary hover:text-secondary hover:cursor-pointer">
                <p className="underline decoration-primary decoration-dotted ms-14">HIT</p>
                <p className="underline decoration-primary decoration-dotted ms-8">START</p>
                <p className="underline decoration-primary decoration-dotted mx-auto">TO</p>
                <p className="underline decoration-primary decoration-dotted mx-auto">CONTINUE</p>
                <p className="underline decoration-primary decoration-dotted mx-auto">GAME</p>
            </div>
        </div>
    )
}