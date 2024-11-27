import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Dog(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/dog.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions.Animation;
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1.5;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Dog_Armature_54">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.material}
                    skeleton={nodes.Object_7.skeleton}
                    morphTargetDictionary={nodes.Object_7.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_7.morphTargetInfluences}
                  />
                  <group name="dog_body_53" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/dog.glb");
