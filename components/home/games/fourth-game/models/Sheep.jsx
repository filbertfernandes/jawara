import { useGLTF, useAnimations } from "@react-three/drei";
import { useRef, useEffect } from "react";

export default function Sheep(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/sheep.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions.Animation;
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="AnimalArmature_38">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.TexMap}
                    skeleton={nodes.Object_7.skeleton}
                    morphTargetDictionary={nodes.Object_7.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_7.morphTargetInfluences}
                  />
                  <group name="BSJZYSOYYZT1ZPX6BJXRNW3KW_37" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/sheep.glb");
