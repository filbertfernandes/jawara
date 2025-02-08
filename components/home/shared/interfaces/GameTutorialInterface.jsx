import { useEffect, useState } from "react";
import {
  FaArrowDown,
  FaArrowLeft,
  FaArrowRight,
  FaArrowUp,
} from "react-icons/fa";
import { GiClick } from "react-icons/gi";
import { LuMousePointerClick } from "react-icons/lu";

import ControlButton from "./ControlButton";

import { phases, useGame } from "@/hooks/useGame";

const howToPlaySteps = {
  [phases.FIRST_GAME]: [
    {
      icon: "1️⃣",
      title: "Explore the 3D Model",
      description:
        "A 3D human body will appear on your screen. You can rotate the camera to view it from different angles.",
    },
    {
      icon: "2️⃣",
      title: "Find the Input Box",
      description: "Some body parts have an input box attached to them.",
    },
    {
      icon: "3️⃣",
      title: "Type the Javanese Word",
      description:
        'Click on the input box and type the correct Javanese word for that body part. Example: If the input box is near the eye, type "moto" (Javanese for "eye").',
    },
    {
      icon: "4️⃣ ✅",
      title: "Instant Feedback",
      description:
        "If your answer is correct, the input box will turn green automatically!",
    },
    {
      icon: "5️⃣ ⏳",
      title: "Finish as Fast as Possible",
      description:
        "The goal is to complete all body parts as quickly as you can. The faster you finish, the better your score!",
    },
  ],
  [phases.SECOND_GAME]: [
    {
      icon: "1️⃣",
      title: "Control the Ball",
      description:
        "Use the left and right controls to move the ball across the screen. Push the ball to hit the colored boxes.",
    },
    {
      icon: "2️⃣",
      title: "Identify the Javanese Word",
      description:
        "At the top of the screen, you will see a word in Javanese (e.g., 'Abang'). This word corresponds to a color.",
    },
    {
      icon: "3️⃣",
      title: "Find the Correct Box",
      description:
        "Look for the colored box that matches the word in Javanese. For example, if the word is 'Abang,' you need to find and hit the red box.",
    },
    {
      icon: "4️⃣",
      title: "Push the Ball",
      description:
        "Use your controls to push the ball toward the correct colored box.",
    },
    {
      icon: "5️⃣ ✅",
      title: "Score Points",
      description:
        "Every time the ball hits the correct colored box, your score will increase!",
    },
    {
      icon: "6️⃣ ⏳",
      title: "Beat the Timer",
      description:
        "Try to get as many points as possible before the time runs out (100 seconds).",
    },
  ],
  [phases.THIRD_GAME]: [
    {
      icon: "1️⃣",
      title: "Control the Ball",
      description:
        "You can move the ball in all directions and jump to navigate the field.",
    },
    {
      icon: "2️⃣",
      title: "Find the Correct Number",
      description:
        'At the top of the screen, a Javanese number will be displayed. Example: If it shows "Siji" (which means "1"), you need to find the square with "1" written on it.',
    },
    {
      icon: "3️⃣",
      title: "Move to the Correct Square",
      description:
        "Guide the ball to touch the square that contains the correct number.",
    },
    {
      icon: "4️⃣ ✅",
      title: "Score Points",
      description:
        "Each correct number you reach will increase your score. If you go to the wrong number, your score will decrease.",
    },
    {
      icon: "6️5️⃣ ⏳",
      title: "Beat the Timer",
      description:
        "Try to get as many points as possible before the time runs out (100 seconds).",
    },
  ],
  [phases.FOURTH_GAME]: [
    {
      icon: "1️⃣",
      title: "Control Your Character",
      description:
        "Move your character around the area to explore different animals.",
    },
    {
      icon: "2️⃣",
      title: "Find the Correct Animal",
      description:
        'At the top of the screen, a Javanese word will be displayed. Example: If it shows "Pitik" (which means "chicken"), you need to find a chicken in the area.',
    },
    {
      icon: "3️⃣",
      title: "Walk Closer to the Animal",
      description:
        "Move your character closer to the animal you think is correct.",
    },
    {
      icon: "4️⃣ 🎯",
      title: "Select the Animal",
      description:
        'Press the "Select" button when near the animal to choose it.',
    },
    {
      icon: "5️⃣ ✅",
      title: "Score Points",
      description:
        "If you selected the correct animal, your score will increase. If wrong, your score will decrease.",
    },
    {
      icon: "6️⃣ ⏳",
      title: "Beat the Timer",
      description:
        "Try to get as many points as possible before the time runs out (100 seconds).",
    },
  ],
};

const controls = {
  [phases.FIRST_GAME]: [
    {
      title: "Rotate Camera",
      buttons: [LuMousePointerClick, GiClick],
    },
  ],
  [phases.SECOND_GAME]: [
    {
      title: "Move Left",
      buttons: ["A", FaArrowLeft],
    },
    {
      title: "Move Right",
      buttons: ["D", FaArrowRight],
    },
    {
      title: "Push the Ball",
      buttons: ["W", FaArrowUp],
    },
    {
      title: "Jump",
      buttons: ["Space"],
      className: "w-36 lg:w-60",
    },
  ],
  [phases.THIRD_GAME]: [
    {
      title: "Move Left",
      buttons: ["A", FaArrowLeft], // "A" key or Left Arrow
    },
    {
      title: "Move Right",
      buttons: ["D", FaArrowRight], // "D" key or Right Arrow
    },
    {
      title: "Move Forward",
      buttons: ["W", FaArrowUp], // "W" key or Up Arrow
    },
    {
      title: "Move Backward",
      buttons: ["S", FaArrowDown], // "S" key or Down Arrow
    },
    {
      title: "Jump",
      buttons: ["Space"], // Space key
      className: "w-36 lg:w-60",
    },
  ],
  [phases.FOURTH_GAME]: [
    {
      title: "Move Left",
      buttons: ["A", FaArrowLeft], // "A" key or Left Arrow
    },
    {
      title: "Move Right",
      buttons: ["D", FaArrowRight], // "D" key or Right Arrow
    },
    {
      title: "Move Forward",
      buttons: ["W", FaArrowUp], // "W" key or Up Arrow
    },
    {
      title: "Move Backward",
      buttons: ["S", FaArrowDown], // "S" key or Down Arrow
    },
    {
      title: "Jump",
      buttons: ["Space"], // Space key
      className: "w-36 lg:w-60",
    },
    {
      title: "Select Animal",
      buttons: ["Enter"], // Enter key
      className: "w-36 lg:w-60",
    },
  ],
};

const GameTutorialInterface = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const { phase } = useGame((state) => ({
    phase: state.phase,
  }));

  return (
    <div
      className={`mt-8 flex size-full flex-col items-center overflow-scroll ${
        isVisible ? "animate-bounceIn" : "opacity-0"
      }`}
    >
      <h1 className="h1-bold text-white drop-shadow-lg">Controls</h1>
      <div className="flex w-full justify-center px-4">
        <div className="mb-10 mt-2 flex flex-wrap items-center justify-center gap-4 lg:w-3/4 lg:gap-8">
          {controls[phase].map((control, index) => (
            <div key={index} className="h3-bold text-center text-white">
              {control.title}
              <div className="flex items-center justify-center gap-1">
                {control.buttons.map((Button, buttonIndex) => (
                  <div key={buttonIndex} className="flex items-center gap-1">
                    <ControlButton
                      className={`${
                        control.className ? control.className : ""
                      }`}
                    >
                      {typeof Button === "string" ? (
                        Button // If it's a string, just render it as text
                      ) : (
                        <Button /> // If it's a React component, render the icon
                      )}
                    </ControlButton>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <h1 className="h1-bold text-white drop-shadow-lg">How to Play?</h1>
      <div className="mb-10 mt-2 w-[90%] space-y-4 rounded-xl text-justify font-questrial text-white lg:w-3/4 lg:text-xl">
        {howToPlaySteps[phase].map((step, index) => (
          <p key={index}>
            {step.icon} <strong>{step.title}:</strong> {step.description}
          </p>
        ))}
      </div>
    </div>
  );
};

export default GameTutorialInterface;
