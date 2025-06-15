import { useAnimations, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";

import Asset from "./Asset";
import { useCustomization } from "./stores/useCustomization";

import { useGame } from "@/hooks/useGame";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/avatar/Armature.glb");
  const { animations } = useGLTF("/models/avatar/animations.glb");
  const { customization } = useCustomization((state) => ({
    customization: state.customization,
  }));

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
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.url && (
                <Suspense key={customization[key].asset.name}>
                  <Asset
                    categoryName={key}
                    url={customization[key].asset.url}
                    skeleton={nodes.Plane.skeleton}
                    name={customization[key].asset.name}
                    groupId={customization[key].asset.groupId}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};
