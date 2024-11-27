import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function Giraffe(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/giraffe.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions.loopEating;
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.696}
        >
          <group
            name="6b561c4baab44cc299383fd5826520a4fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="African_Animal_-_Giraffe"
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <group
                    name="_Object_Pivot_Node_"
                    position={[-26.245, 55.418, 1.379]}
                  >
                    <group name="HP_Msh" rotation={[Math.PI / 2, 0, 0]} />
                    <group
                      name="RootMotion"
                      position={[-0.14, 0, 0]}
                      rotation={[Math.PI / 2, -0.695, 0]}
                    >
                      <group name="Object_8">
                        <primitive object={nodes._rootJoint} />
                        <skinnedMesh
                          name="Object_49"
                          geometry={nodes.Object_49.geometry}
                          material={materials.Giraffe_Material}
                          skeleton={nodes.Object_49.skeleton}
                        />
                        <group
                          name="Object_48"
                          rotation={[-Math.PI / 2, 0, 0]}
                        />
                      </group>
                    </group>
                  </group>
                </group>
                <group name="HP_Msh_0" rotation={[-Math.PI / 2, 0, 0]} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/giraffe.glb");
