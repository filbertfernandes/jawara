import { useEffect, useState } from "react"


const GameLeaderboardInterface = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        // Trigger the popup effect after the component mounts
        setIsVisible(true);
    }, []);

    return (
        <div className={ `flex flex-col gap-6 items-center w-full h-full mt-4 ${isVisible ? 'animate-bounceIn' : 'opacity-0'}` }>
            <h1 className="text-4xl text-sky-400 drop-shadow-lg font-bold">Leaderboard</h1>

            <div className="flex justify-between text-sky-100 w-[90%] h-10 bg-stone-800/50 px-4 rounded-lg text-md">
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

            <div className="flex justify-between text-sky-100 w-full h-full bg-stone-800/50 px-4 rounded-t-3xl text-md pt-4">
                <ul className="h-96 w-full overflow-y-auto">
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-yellow-500 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">1</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-slate-500 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">2</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-orange-700 text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">3</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">4</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">5</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">6</span>
                            </div>

                            <div className="flex items-center ml-4">
                                Filbert Fernandes
                            </div>
                        </div>

                        <div className="flex items-center" >35</div>
                    </li>
                    <li className="flex justify-between border-white/10 border-b-2 pt-1 pb-3 px-1 mb-4">

                        <div className="flex">
                            <div class="avatar">
                                <div class="w-14 rounded-full">
                                    <img src="https://www.kaericature.com/wp-content/uploads/2023/05/custom_avatar3_3d.jpg" />
                                </div>
                                <span class="absolute -top-1 -left-1 bg-black text-white text-xs font-bold rounded-full w-[1.125rem] h-[1.125rem] flex items-center justify-center">10</span>
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