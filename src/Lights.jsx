import { useFrame } from "@react-three/fiber"
import { useRef } from "react"
import { useHelper } from '@react-three/drei'
import { DirectionalLightHelper } from 'three'

export default function Lights()
{
    const light = useRef()

    useHelper(light, DirectionalLightHelper, 5, 'hotpink')

    useFrame((state) => {
        light.current.position.z = state.camera.position.z + 1 - 1
        light.current.target.position.z = state.camera.position.z - 1
        light.current.position.x = state.camera.position.x + 4 - 1
        light.current.target.position.x = state.camera.position.x - 1
        light.current.target.position.z = state.camera.position.z - 1
        light.current.target.updateMatrixWorld()
    })

    return <>
        <directionalLight
            ref={ light }
            castShadow
            position={ [ 6, 6, 1 ] }
            intensity={ 4.5 }
            shadow-mapSize={ [ 1024, 1024 ] }
            shadow-camera-near={ 1 }
            shadow-camera-far={ 15 }
            shadow-camera-top={ 15 }
            shadow-camera-right={ 15 }
            shadow-camera-bottom={ - 15 }
            shadow-camera-left={ - 15 }
        />

        <ambientLight intensity={ 1.5 } />
    </>
}