import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { GLTFExporter } from "three/examples/jsm/Addons.js";

import Asset from "./Asset";
import { useCustomization } from "./stores/useCustomization";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/avatar/Armature.glb");
  const { animations } = useFBX("/models/avatar/Idle.fbx");
  const customization = useCustomization((state) => state.customization);
  const { actions } = useAnimations(animations, group);
  const setDownload = useCustomization((state) => state.setDownload);

  useEffect(() => {
    function download() {
      const exporter = new GLTFExporter();
      exporter.parse(
        group.current,
        function (result) {
          save(
            new Blob([result], { type: "application/octet-stream" }),
            `avatar_${+new Date()}.glb`
          );
        },
        function (error) {
          console.error(error);
        },
        { binary: true }
      );
    }

    const link = document.createElement("a");
    link.style.display = "none";
    document.body.appendChild(link); // Firefox workaround, see #6594

    function save(blob, filename) {
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      link.click();
    }
    setDownload(download);
  }, []);

  useEffect(() => {
    actions["mixamo.com"]?.play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Armature" rotation={[Math.PI / 2, 0, 0]} scale={0.01}>
          <primitive object={nodes.mixamorigHips} />
          {Object.keys(customization).map(
            (key) =>
              customization[key]?.asset?.url && (
                <Suspense key={customization[key].asset.name}>
                  <Asset
                    categoryName={key}
                    url={customization[key].asset.url}
                    skeleton={nodes.Plane.skeleton}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};
