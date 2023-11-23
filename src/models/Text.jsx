import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export function Text(props) {
  const { nodes, materials } = useGLTF("/models/text.glb");

  const { PageRotation, widthPage, pagePosition, textPosition, textRotation } =
    useControls({
      widthPage: [21, 2.8, 17],
      pagePosition: [76, 3.3, 9],
      PageRotation: [39.1, 3, 5.4],
      textPosition: [43, 7, 6],
      textRotation: [42.2, 9.3, 5],
    });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plan.geometry}
        material={materials.Material}
        position={pagePosition}
        scale={widthPage}
        rotation={PageRotation}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Texte.geometry}
        material={materials.Matériau}
        position={textPosition}
        rotation={textRotation}
      />
    </group>
  );
}

export default Text;

useGLTF.preload("/models/text.glb");
