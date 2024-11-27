import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef, useState } from "react";

export default function Chicken(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/chicken.glb");
  const { actions } = useAnimations(animations, group);

  // Initial chicken state is set to "idle"
  const [chickenState, setChickenState] = useState("chicken-rig|idle");

  useEffect(() => {
    const action = actions[chickenState];
    action.reset().fadeIn(0.5).play();

    // Set the timeScale based on the chickenState
    if (chickenState === "chicken-rig|idle") {
      action.timeScale = 0.2; // Slow down idle animation
    } else if (chickenState === "chicken-rig|pecking") {
      action.timeScale = 0.5; // Keep pecking animation at normal speed
    }

    // Cleanup the current animation before switching states
    return () => {
      if (actions[chickenState]) {
        action.fadeOut(0.5);
      }
    };
  }, [chickenState, actions]);

  useEffect(() => {
    const interval = setInterval(() => {
      setChickenState((prevState) =>
        prevState === "chicken-rig|idle"
          ? "chicken-rig|pecking"
          : "chicken-rig|idle"
      );
    }, 1500);

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="e4c07e693c3f4d969a0c7ec6dd494ffefbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="chicken-rig"
                  position={[4.703, 149.377, -19.352]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_24"
                      geometry={nodes.Object_24.geometry}
                      material={materials.white}
                      skeleton={nodes.Object_24.skeleton}
                    />
                    <skinnedMesh
                      name="Object_25"
                      geometry={nodes.Object_25.geometry}
                      material={materials.pale_red}
                      skeleton={nodes.Object_25.skeleton}
                    />
                    <skinnedMesh
                      name="Object_26"
                      geometry={nodes.Object_26.geometry}
                      material={materials.gold}
                      skeleton={nodes.Object_26.skeleton}
                    />
                    <skinnedMesh
                      name="Object_27"
                      geometry={nodes.Object_27.geometry}
                      material={materials.black}
                      skeleton={nodes.Object_27.skeleton}
                    />
                    <skinnedMesh
                      name="Object_28"
                      geometry={nodes.Object_28.geometry}
                      material={materials.pale_grey}
                      skeleton={nodes.Object_28.skeleton}
                    />
                    <skinnedMesh
                      name="Object_29"
                      geometry={nodes.Object_29.geometry}
                      material={materials.mid_grey}
                      skeleton={nodes.Object_29.skeleton}
                    />
                    <skinnedMesh
                      name="Object_30"
                      geometry={nodes.Object_30.geometry}
                      material={materials.buttermilk}
                      skeleton={nodes.Object_30.skeleton}
                    />
                    <group
                      name="Object_23"
                      position={[5.249, 189.502, 0]}
                      rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="Chicken"
                  position={[5.249, 189.502, 0]}
                  rotation={[-Math.PI / 2, 0, -Math.PI / 2]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/chicken.glb");
