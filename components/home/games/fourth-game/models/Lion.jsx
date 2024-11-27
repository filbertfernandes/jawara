import { useGLTF, useAnimations } from "@react-three/drei";
import React, { useEffect, useRef } from "react";

export default function Lion(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/lion.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Animation.reset().fadeIn(0.2).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="AnimalArmature_47">
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
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.material}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name="Object_5_45" />
                  <group name="Object_5001_46" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/lion.glb");
