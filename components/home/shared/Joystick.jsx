import Nipple from "react-nipple";
import { useMediaQuery } from "react-responsive";

const Joystick = ({ onMove }) => {
  const isMobile = useMediaQuery({ maxWidth: 900 });
  const isPortraitMobile = useMediaQuery({ maxWidth: 768 });

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
        bottom: isPortraitMobile ? "50px" : "25px",
        left: "50px",
        zIndex: 0,
      }}
      onMove={(evt, data) => {
        const { angle, distance } = data;
        const radian = angle.radian - Math.PI / 2;
        const x = distance * Math.cos(radian);
        const y = distance * Math.sin(radian);
        onMove({ x, y });
      }}
      onEnd={() => {
        onMove({ x: 0, y: 0 });
      }}
    />
  ) : null;
};

export default Joystick;
