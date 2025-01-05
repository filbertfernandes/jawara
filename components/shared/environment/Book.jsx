import { Edges, Outlines, useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import { useRef, useState } from "react";

const Book = () => {
  const { nodes, materials } = useGLTF("./models/environment/book.glb");
  const [hovered, setHovered] = useState(false);

  const handlePointerOver = () => {
    document.body.style.cursor = "pointer";
    setHovered(true);
  };

  const handlePointerOut = () => {
    document.body.style.cursor = "default";
    setHovered(false);
  };

  const handleClick = () => {
    alert("You clicked the book!");
    // Add your logic here (e.g., navigate, show modal, etc.)
  };

  return (
    <group dispose={null} scale={3.2}>
      <group
        position={[-2.301, 0.426, 1.752]}
        rotation={[-Math.PI, 0.273, -Math.PI]}
        scale={0.112}
      >
        <RigidBody type="fixed" colliders="trimesh" density={7} restitution={0}>
          <mesh
            geometry={nodes.Cube_1.geometry}
            material={materials["Material.001"]}
            onPointerOver={handlePointerOver}
            onPointerOut={handlePointerOut}
            onClick={handleClick}
          >
            {hovered && (
              <>
                <Edges linewidth={3} threshold={100} color={[10, 10, 10]} />
                <Outlines thickness={0.01} color={[1, 1, 1]} />
              </>
            )}
          </mesh>
        </RigidBody>
        <mesh
          geometry={nodes.Cube_2.geometry}
          material={materials["jawara-logo"]}
        />
        <mesh
          geometry={nodes.Cube_3.geometry}
          material={materials["Material.002"]}
        />
      </group>
    </group>
  );
};

export default Book;
