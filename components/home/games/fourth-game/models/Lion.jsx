import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Lion(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/lion.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions.Animation_Armature.reset().fadeIn(0.2).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.817}
        >
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Armature_77" position={[-0.001, 0.001, -0.004]}>
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Mat_Lion}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <skinnedMesh
                    name="Object_9"
                    geometry={nodes.Object_9.geometry}
                    material={materials.mat_mouth}
                    skeleton={nodes.Object_9.skeleton}
                  />
                  <group name="Lion_76">
                    <group name="mouth_75" />
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

useGLTF.preload("/models/game/lion.glb");
