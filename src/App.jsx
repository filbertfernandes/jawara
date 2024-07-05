import { Canvas } from '@react-three/fiber'
import Experience from './components/Experience.jsx'
import { Interface } from './components/first-game/Interface.jsx'

export default function App()
{
    return (
        <>
            <Canvas
                shadows
                camera={ {
                    fov: 45,
                    near: 0.1,
                    far: 200,
                    position: [ 0, 1, 3 ]
                } }
            >

                <Experience />

            </Canvas>

            <Interface />
        </>
    )
}