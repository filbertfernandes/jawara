import { useRef, useEffect } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Rabbit(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/game/rabbit.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions["metarig.002Action"]
    action.reset().fadeIn(0.2).play()
    action.timeScale = 1
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="root">
            <group name="GLTF_SceneRootNode" rotation={[Math.PI / 2, 0, 0]}>
              <group name="metarig002_38">
                <group name="GLTF_created_0">
                  <primitive object={nodes.GLTF_created_0_rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials["Material.001"]}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Plane002_37" />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/game/rabbit.glb")
