import { useEffect, useRef } from "react"
import { useGLTF, useAnimations } from "@react-three/drei"
import { useGame } from "@/hooks/useGame.jsx"

export default function Player(props) {
  const group = useRef()
  const { nodes, materials, animations } = useGLTF("./models/character/boy.glb")
  const { actions } = useAnimations(animations, group)

  const { playerState } = useGame((state) => ({
    playerState: state.playerState,
  }))

  useEffect(() => {
    actions[playerState].reset().fadeIn(0.2).play()
    return () => {
      actions[playerState].fadeOut(0.2)
    }
  }, [playerState])

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Sketchfab_model001">
          <group name="Putuobjcleanermaterialmergergles001" />
        </group>
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          {/* Ikat pinggang & kaos kaki */}
          <skinnedMesh
            name="Object_10001"
            geometry={nodes.Object_10001.geometry}
            material={materials["lambert5SG.001"]}
            skeleton={nodes.Object_10001.skeleton}
          />

          {/* Sepatu & Alis */}
          <skinnedMesh
            // castShadow
            name="Object_11001"
            geometry={nodes.Object_11001.geometry}
            material={materials["lambert6SG.001"]}
            skeleton={nodes.Object_11001.skeleton}
          />

          {/* Mata */}
          <skinnedMesh
            // castShadow
            name="Object_12001"
            geometry={nodes.Object_12001.geometry}
            material={materials.lambert7SG}
            skeleton={nodes.Object_12001.skeleton}
          />

          {/* Baju */}
          <skinnedMesh
            // castShadow
            name="Object_2001"
            geometry={nodes.Object_2001.geometry}
            material={materials.BajuSDlambert1SG}
            skeleton={nodes.Object_2001.skeleton}
          />

          {/* Kepala */}
          <skinnedMesh
            // castShadow
            name="Object_3001"
            geometry={nodes.Object_3001.geometry}
            material={materials["BaseIbu_Pitunglambert2SG.001"]}
            skeleton={nodes.Object_3001.skeleton}
          />

          {/* <skinnedMesh
            name="Object_4001"
            geometry={nodes.Object_4001.geometry}
            material={materials['Texture_Pitung1MerahBajuSG.001']}
            skeleton={nodes.Object_4001.skeleton}
          /> */}

          {/* Dasi */}
          <skinnedMesh
            name="Object_5001"
            geometry={nodes.Object_5001.geometry}
            material={materials.Tielambert1SG}
            skeleton={nodes.Object_5001.skeleton}
          />
          {/* Celana */}
          <skinnedMesh
            // castShadow
            name="Object_6001"
            geometry={nodes.Object_6001.geometry}
            material={materials.Gedelambert3SG}
            skeleton={nodes.Object_6001.skeleton}
          />
          {/* Rambut */}
          <skinnedMesh
            // castShadow
            name="Object_7001"
            geometry={nodes.Object_7001.geometry}
            material={materials["lambert6SG.001"]}
            skeleton={nodes.Object_7001.skeleton}
          />
          {/* logo OSIS */}
          <skinnedMesh
            name="Object_8001"
            geometry={nodes.Object_8001.geometry}
            material={materials.lambert9SG}
            skeleton={nodes.Object_8001.skeleton}
          />
          {/* Tangan & Kaki */}
          <skinnedMesh
            // castShadow
            name="Object_9001"
            geometry={nodes.Object_9001.geometry}
            material={materials.BaseIbu_Pitunglambert2SG}
            skeleton={nodes.Object_9001.skeleton}
          />
          <primitive object={nodes.mixamorigHips} />
        </group>
      </group>
    </group>
  )
}

useGLTF.preload("./models/character/boy.glb")
