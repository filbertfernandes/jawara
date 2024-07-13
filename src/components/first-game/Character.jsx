import { useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { FirstGameLevel } from './FirstGameLevel'

export default function Character(props) {
    const characterBody = useRef()

    const { nodes, materials } = useGLTF('./models/character/boy_no_animation.glb')

    return (
        <group ref={characterBody} {...props} dispose={null}>
            
            {/* Number with INPUT */}
            <FirstGameLevel characterBody={ characterBody } />

            <group rotation={[-Math.PI / 2, 0, 0]}>
                <mesh castShadow geometry={nodes.Object_2.geometry} material={materials.BajuSDlambert1SG} />
                <mesh castShadow geometry={nodes.Object_3.geometry} material={materials.BaseIbu_Pitunglambert2SG} />
                <mesh geometry={nodes.Object_4.geometry} material={materials.Texture_Pitung1MerahBajuSG} />
                <mesh geometry={nodes.Object_5.geometry} material={materials.Tielambert1SG} />
                <mesh castShadow geometry={nodes.Object_6.geometry} material={materials.Gedelambert3SG} />
                <mesh castShadow geometry={nodes.Object_7.geometry} material={materials.lambert6SG} />
                <mesh geometry={nodes.Object_8.geometry} material={materials.lambert9SG} />
                <mesh castShadow geometry={nodes.Object_9.geometry} material={materials.BaseIbu_Pitunglambert2SG} />
                <mesh geometry={nodes.Object_10.geometry} material={materials.lambert5SG} />
                <mesh castShadow geometry={nodes.Object_11.geometry} material={materials.lambert6SG} />
                <mesh geometry={nodes.Object_12.geometry} material={materials.lambert7SG} />
            </group>
        </group>
    )
}

useGLTF.preload('./models/character/boy_no_animation.glb')
