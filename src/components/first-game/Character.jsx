import React, { useEffect, useState, useRef } from 'react'
import { useGLTF } from '@react-three/drei'
import { Html } from '@react-three/drei'
import { useFirstGame } from './store/useFirstGame.jsx'

export default function Character(props) {
    const { level, currentStage, nextStage } = useFirstGame((state) => ({
        level: state.level,
        currentStage: state.currentStage,
        nextStage: state.nextStage
    }))

    const [inputBoxes, setInputBoxes] = useState([])
    
    console.log('rerendered');

    useEffect(() => {
        if(level) {
            setInputBoxes(level[currentStage])
        }
    }, [level, currentStage])

    const characterBody = useRef()

    const handleNumberHover = (index) => {
        const newInputBoxes = [...inputBoxes]
        newInputBoxes[index].visible = true
        setInputBoxes(newInputBoxes)
    }

    const handleNumberClick = (index) => {
        const newInputBoxes = [...inputBoxes]
        newInputBoxes[index].visible = !newInputBoxes[index].visible
        setInputBoxes(newInputBoxes)
    }

    const { nodes, materials } = useGLTF('./models/character/boy.glb')

    if (!level) return null

    return (
        <group ref={characterBody} {...props} dispose={null}>
            {/* Number with INPUT */}
            {inputBoxes.map((box, index) => (
                <Html
                    key={index}
                    position={box.position}
                    wrapperClass="label"
                    distanceFactor={1.2}
                    occlude={[characterBody]}
                >
                    <div className="number" onMouseEnter={() => handleNumberHover(index)} onClick={() => handleNumberClick(index)}>
                        {index + 1}
                    </div>
                    <div className={`input-box ${box.visible ? 'visible' : ''}`}>
                        <input type="text" />
                    </div>
                </Html>
            ))}

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

useGLTF.preload('./models/character/boy.glb')
