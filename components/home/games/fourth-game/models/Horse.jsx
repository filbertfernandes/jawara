import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Horse(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/horse.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    const action = actions.metarigAction;
    action.reset().fadeIn(0.2).play();
    action.timeScale = 1;
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group
                name="metarig_49"
                position={[1.023, -2.842, 0]}
                rotation={[0, -Math.PI / 2, 0]}
                scale={[2.42, 2.42, 2.727]}
              >
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials["Material.005"]}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Plane_48" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
}

useGLTF.preload("/models/game/horse.glb");
