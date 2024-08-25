import { useEffect, useState } from "react"


const GameLeaderboardInterface = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col items-center gap-6 w-full h-full mt-8 sm:gap-4 sm:-mt-8 ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold lg:text-6xl">Leaderboard</h1>

            <div className="flex justify-between text-white w-[90%] h-10 bg-stone-800/50 px-4 rounded-lg sm:text-lg sm:w-[70%] md:text-xl lg:text-2xl lg:w-[50%]">
                <div className="flex items-center text-center border-sky-400 border-b-2" onClick={ () => console.log('clicked') } >
                    Ngoko
                </div>

                <div className="flex items-center text-center" onClick={ () => console.log('clicked') } >
                    Krama Madya
                </div>

                <div className="flex items-center text-center" onClick={ () => console.log('clicked') } >
                    Krama Alus
                </div>
            </div>

            <div className="flex justify-between text-white text-sm w-full h-full bg-stone-800/50 px-4 rounded-t-3xl rounded-b-3xl pt-4 sm:text-base sm:w-[90%] md:text-lg lg:text-2xl lg:w-[70%]">
                <ul className="h-full w-full overflow-y-auto pb-64 sm:pb-28">
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">1</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-slate-500 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">2</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-orange-700 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">3</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">4</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">5</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">6</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">7</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">8</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">9</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1">

                        <div className="flex">
                            <div className="avatar">
                                <div className="w-12 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span className="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">10</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                </ul>
            </div>
        </div>
    )
}

export default GameLeaderboardInterface