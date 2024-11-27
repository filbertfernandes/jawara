import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Elephant(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/elephant.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions["Armature|Idle"];
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="e95b66735c8c4d4cae9537d5b8cb804afbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Armature">
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_76"
                      geometry={nodes.Object_76.geometry}
                      material={materials.default2}
                      skeleton={nodes.Object_76.skeleton}
                    />
                    <group
                      name="Object_75"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={75.357}
                    />
                  </group>
                </group>
                <group
                  name="african_elephant_exp1_0_0"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={75.357}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/elephant.glb");
