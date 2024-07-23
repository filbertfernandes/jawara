import { RigidBody } from "@react-three/rapier";

export default function Level()
{

    return <>
        
        <RigidBody type="fixed" >
            <mesh position={ [0, 0.5, -15] } scale={ [1, 1, 1] } castShadow receiveShadow>
                <boxGeometry />
                <meshStandardMaterial color="lime" />
            </mesh>
        </RigidBody>
                
    </>

}