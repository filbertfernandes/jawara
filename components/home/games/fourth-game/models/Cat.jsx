import { useRef, useEffect } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Cat(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/game/cat.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions.Animation
    action.reset().fadeIn(0.2).play()
    action.timeScale = 1
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="cat_Rigao_41" scale={0.369}>
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
                    name="Object_8"
                    geometry={nodes.Object_8.geometry}
                    material={materials.cat_diffuse}
                    skeleton={nodes.Object_8.skeleton}
                    morphTargetDictionary={nodes.Object_8.morphTargetDictionary}
                    morphTargetInfluences={nodes.Object_8.morphTargetInfluences}
                  />
                  <group name="cat_40" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/game/cat.glb")
