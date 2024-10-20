import { useRef, useEffect } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Frog(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/game/frog.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions.Animation
    action.reset().fadeIn(0.2).play()
    action.timeScale = 1.3
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="Frog_001_Eyes_0_0">
                <mesh
                  name="mesh_0"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_0.geometry}
                  material={materials.Eyes}
                  morphTargetDictionary={nodes.mesh_0.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0.morphTargetInfluences}
                />
                <mesh
                  name="mesh_0_1"
                  castShadow
                  receiveShadow
                  geometry={nodes.mesh_0_1.geometry}
                  material={materials.Frog}
                  morphTargetDictionary={nodes.mesh_0_1.morphTargetDictionary}
                  morphTargetInfluences={nodes.mesh_0_1.morphTargetInfluences}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/game/frog.glb")
