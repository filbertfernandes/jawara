import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

import { useGame } from "@/hooks/useGame.jsx";

export default function Player(props) {
  const group = useRef();
  const { scene } = useGLTF("/models/avatar/avatar.glb");
  const { animations } = useGLTF("/models/avatar/animations.glb");
  const { actions } = useAnimations(animations, group);

  const { playerState } = useGame((state) => ({
    playerState: state.playerState,
  }));

  useEffect(() => {
    actions[playerState].reset().fadeIn(0.2).play();
    return () => {
      if (actions[playerState]) {
        actions[playerState].fadeOut(0.2);
      }
    };
  }, [playerState]);

  return (
    <group ref={group} {...props} dispose={null}>
      <primitive object={scene} scale={1.7} />
    </group>
  );
}

useGLTF.preload("/models/character/boy.glb");
