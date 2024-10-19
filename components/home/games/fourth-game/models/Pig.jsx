import { useEffect, useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"

export default function Pig(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("/models/game/pig.glb")
  const { actions } = useAnimations(animations, group)

  useEffect(() => {
    const action = actions.Pig_Idle
    action.reset().fadeIn(0.5).play()
    action.timeScale = 9
  }, [actions])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="99aa7b7e510f4b5f83c584275bf9a71dfbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.lambert1}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_6" position={[0, -2.805, 0]} />
                  <group name="piglowpolymodelMesh" position={[0, -2.805, 0]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("/models/game/pig.glb")
