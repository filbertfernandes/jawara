import { useEffect, useState } from "react"


const GameMaterialInterface = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col justify-center items-center gap-6 w-full h-[75%] ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold lg:text-6xl">Material</h1>
        </div>
    )
}

export default GameMaterialInterface