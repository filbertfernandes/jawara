import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

import { useCustomization } from "./stores/useCustomization";

const Asset = ({ categoryName, url, skeleton }) => {
  const { scene } = useGLTF(url);

  const customization = useCustomization((state) => state.customization);

  const assetColor = customization[categoryName].color;

  const skin = useCustomization((state) => state.skin);

  useEffect(() => {
    scene.traverse((child) => {
      if (child.isMesh) {
        if (child.material?.name.includes("Color_")) {
          child.material.color.set(assetColor);
        }
      }
    });
  }, [assetColor, scene]);

  const attachedItems = useMemo(() => {
    const items = [];
    scene.traverse((child) => {
      if (child.isMesh) {
        items.push({
          geometry: child.geometry,
          material: child.material.name.includes("Skin_")
            ? skin
            : child.material,
        });
      }
    });
    return items;
  }, [scene]);

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      castShadow
      receiveShadow
    />
  ));
};

export default Asset;
