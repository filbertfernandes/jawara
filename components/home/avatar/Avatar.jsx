import { NodeIO } from "@gltf-transform/core";
import { dedup, draco, prune, quantize } from "@gltf-transform/functions";
import { useAnimations, useFBX, useGLTF } from "@react-three/drei";
import { Suspense, useEffect, useRef } from "react";
import { GLTFExporter } from "three/examples/jsm/Addons.js";

import Asset from "./Asset";
import { useCustomization } from "./stores/useCustomization";

import { useGame } from "@/hooks/useGame";

export const Avatar = ({ ...props }) => {
  const group = useRef();
  const { nodes } = useGLTF("/models/avatar/Armature.glb");
  const { animations } = useGLTF("/models/avatar/animations.glb");
  const { customization, setDownload } = useCustomization((state) => ({
    customization: state.customization,
    setDownload: state.setDownload,
  }));

  const { actions } = useAnimations(animations, group);

  const { playerState } = useGame((state) => ({
    playerState: state.playerState,
  }));

  useEffect(() => {
    actions[playerState].reset().fadeIn(0.2).play();
    return () => {
      if (actions[playerState]) {
        actions[playerState].fadeOut(0.2);
      }
    };
  }, [playerState]);

  useEffect(() => {
    function download() {
      const exporter = new GLTFExporter();
      exporter.parse(
        group.current,
        async function (result) {
          const io = new NodeIO();

          // Read
          const document = await io.readBinary(new Uint8Array(result)); // Uint8Array -> Document
          await document.transform(
            // Remove unused nodes, textures, or other data.
            prune(),
            // Remove duplicate vertex or texture data, if any.
            dedup(),
            // Compress mesh geometry with Draco.
            draco(),
            // Quantize mesh geometry.
            quantize()
          );

          // Write
          const glb = await io.writeBinary(document); // Document -> Uint8Array

          save(
            new Blob([glb], { type: "application/octet-stream" }),
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
                    name={customization[key].asset.name}
                    groupId={customization[key].asset.groupId}
                  />
                </Suspense>
              )
          )}
        </group>
      </group>
    </group>
  );
};
