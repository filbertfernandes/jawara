import { useGLTF, useAnimations } from "@react-three/drei";
import { useEffect, useRef } from "react";

export default function Cow(props) {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/game/cow.glb");
  const { actions } = useAnimations(animations, group);

  useEffect(() => {
    actions["Armature|idle1"].reset().fadeIn(0.2).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="4f80e805954e468296a921e70374d8dcfbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="Armature"
                  position={[0, -0.58, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_62"
                      geometry={nodes.Object_62.geometry}
                      material={materials.material}
                      skeleton={nodes.Object_62.skeleton}
                    />
                    <skinnedMesh
                      name="Object_64"
                      geometry={nodes.Object_64.geometry}
                      material={materials.eyes}
                      skeleton={nodes.Object_64.skeleton}
                    />
                    <group
                      name="Object_61"
                      position={[0, -0.58, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                    <group
                      name="Object_63"
                      position={[0, -0.58, 0]}
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="Body"
                  position={[0, -0.58, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
                <group
                  name="Eye"
                  position={[0, -0.58, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
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

useGLTF.preload("/models/game/cow.glb");
