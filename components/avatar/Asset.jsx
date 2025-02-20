import { useGLTF } from "@react-three/drei";
import { useEffect, useMemo } from "react";

import { useCustomization } from "./stores/useCustomization";

const Asset = ({ categoryName, url, skeleton, name, groupId }) => {
  const { scene } = useGLTF(url);

  const { customization, lockedGroups, skin } = useCustomization((state) => ({
    customization: state.customization,
    lockedGroups: state.lockedGroups,
    skin: state.skin,
  }));

  const assetColor = customization[categoryName].color;

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
          morphTargetDictionary: child.morphTargetDictionary,
          morphTargetInfluences: child.morphTargetInfluences,
        });
      }
    });
    return items;
  }, [scene]);

  if (lockedGroups[categoryName]) {
    return null;
  }

  return attachedItems.map((item, index) => (
    <skinnedMesh
      key={index}
      geometry={item.geometry}
      material={item.material}
      skeleton={skeleton}
      morphTargetDictionary={item.morphTargetDictionary}
      morphTargetInfluences={item.morphTargetInfluences}
      castShadow
      receiveShadow
      name={index === 0 ? JSON.stringify({ groupId, name }) : ""}
    />
  ));
};

export default Asset;
