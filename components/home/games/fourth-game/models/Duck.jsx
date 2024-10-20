import { useEffect, useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Duck(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/game/duck.glb")
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
              <group
                name="Sketchfab_model_0"
                rotation={[-Math.PI / 2, 0, 0]}
                scale={4.606}
              >
                <group name="root_1">
                  <group
                    name="GLTF_SceneRootNode_2"
                    rotation={[Math.PI / 2, 0, 0]}
                  >
                    <group
                      name="Sketchfab_model_0_3"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={0.749}
                    >
                      <group name="root_1_4">
                        <group
                          name="GLTF_SceneRootNode_2_5"
                          rotation={[Math.PI / 2, 0, 0]}
                        >
                          <group name="80A269F9-4D61-429B-874A-04416A87C26F_57_3_6">
                            <group name="GLTF_created_0_4_7">
                              <group name="GLTF_created_0_8">
                                <group name="GLTF_created_0">
                                  <primitive
                                    object={nodes.GLTF_created_0_rootJoint}
                                  />
                                  <skinnedMesh
                                    name="Object_75"
                                    geometry={nodes.Object_75.geometry}
                                    material={materials.material_0}
                                    skeleton={nodes.Object_75.skeleton}
                                  />
                                  <group name="Object_70_70_correction">
                                    <group name="Object_70_70" />
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
      </group>
    </group>
  )
}

useGLTF.preload("/models/game/duck.glb")
