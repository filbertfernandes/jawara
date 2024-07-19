import { useFrame } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'

export default function Lights()
{
    const light = useRef()

    // useHelper(light, DirectionalLightHelper, 5, 'hotpink')

    
    useFrame((state) => {
        light.current.position.z = state.camera.position.z + 1
        light.current.target.position.z = state.camera.position.z
        light.current.target.updateMatrixWorld()
    })

    return <>
        <directionalLight
            ref={ light }
            castShadow
            position={ [ 6.8, 6.8, 1 ] }
            intensity={ 1.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 20 }
            shadow-camera-top={ 20 }
            shadow-camera-right={ 20 }
            shadow-camera-bottom={ - 20 }
            shadow-camera-left={ - 20 }
        />

        <ambientLight intensity={ 1.5 } />
    </>
}