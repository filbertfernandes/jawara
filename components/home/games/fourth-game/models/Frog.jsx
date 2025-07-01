import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function Frog(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/frog.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions["Take 001"];
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1.3;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Sketchfab_model_86" rotation={[-Math.PI / 2, 0, 0]}>
                <group
                  name="frog_animatedfbx_85"
                  rotation={[Math.PI / 2, 0, 0]}
                  scale={0.01}
                >
                  <group name="Object_2_84">
                    <group name="RootNode_83">
                      <group name="frogs_82">
                        <group name="frog_01b_group_001_81">
                          <group
                            name="frog_01b_001_locator_80"
                            rotation={[-0.216, 0.287, 0.062]}
                            scale={20}
                          >
                            <group name="Object_7_79">
                              <group name="GLTF_created_0">
                                <primitive
                                  object={nodes.GLTF_created_0_rootJoint}
                                />
                                <skinnedMesh
                                  name="Object_14"
                                  geometry={nodes.Object_14.geometry}
                                  material={materials.M_frog_01b}
                                  skeleton={nodes.Object_14.skeleton}
                                />
                                <group name="Object_85_78" />
                              </group>
                            </group>
                          </group>
                        </group>
                      </group>
                    </group>
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

useGLTF.preload("/models/game/frog.glb");
