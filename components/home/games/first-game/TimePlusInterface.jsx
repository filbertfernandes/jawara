import { useRef, useEffect, useState } from "react";

const TimePlusInterface = ({ penaltyTime }) => {
  const timeoutId = useRef(null);

  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (penaltyTime <= 0) return;

    // Clear any existing timeout to avoid overlap
    if (timeoutId.current) {
      clearTimeout(timeoutId.current);
    }

    // Trigger the animation
    setIsVisible(false); // Reset visibility to restart the animation
    requestAnimationFrame(() => {
      setIsVisible(true);
    });

    // Set a new timeout to hide the animation after 4000ms
    timeoutId.current = setTimeout(() => {
      setIsVisible(false);
    }, 3000);
  }, [penaltyTime]);

  return (
    <div
      className={`pointer-events-none absolute left-0 top-0 flex size-full items-center justify-center text-center font-bebas text-5xl md:text-6xl lg:text-8xl text-red-400
        ${isVisible ? "animate-bounceInFadeOut" : "opacity-0"}`}
    >
      <div>
        +5<span className="ml-1 text-2xl md:text-3xl lg:text-5xl">s</span>
      </div>
    </div>
  );
};

export default TimePlusInterface;
