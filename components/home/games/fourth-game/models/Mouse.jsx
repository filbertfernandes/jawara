import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Mouse(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/mouse.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions["rig|rigAction"];
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1.3;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="c520d950d2254cca8d9733f8c3bc84b4fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Mowse_HP"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group name="rig" rotation={[-Math.PI / 2, 0, 0]} scale={100}>
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    <group
                      name="Object_8"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/mouse.glb");
