import React, { useState } from "react";
import Nipple from "react-nipple";
import { useMediaQuery } from "react-responsive";

const Joystick = ({ onMove }) => {
  const [joystickPosition, setJoystickPosition] = useState({ x: 0, y: 0 });

  const isMobile = useMediaQuery({ maxWidth: 900 });

  return isMobile ? (
    <Nipple
      options={{
        mode: "static",
        position: { top: "50%", left: "50%" },
      }}
      style={{
        width: "100px",
        height: "100px",
        position: "absolute",
        bottom: "50px",
        left: "50px",
      }}
      onMove={(evt, data) => {
        const { angle, distance } = data;
        const radian = angle.radian - Math.PI / 2;
        const x = distance * Math.cos(radian);
        const y = distance * Math.sin(radian);
        setJoystickPosition({ x, y });
        onMove({ x, y });
      }}
      onEnd={() => {
        setJoystickPosition({ x: 0, y: 0 });
        onMove({ x: 0, y: 0 });
      }}
    />
  ) : null;
};

export default Joystick;
