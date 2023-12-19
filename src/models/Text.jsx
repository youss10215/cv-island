import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export function Text(props) {
  const { nodes, materials } = useGLTF("/models/items/text.glb");

  const { textPosition, textRotation } = useControls({
    textPosition: [0.92, 0.1, 0.2],
    textRotation: [0, 3.13, 0],
  });

  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plan.geometry}
        material={materials.Material}
      />
      <mesh
        castShadow
        receiveShadow
        scale={[0.1, 0.1, 0.1]}
        geometry={nodes.Texte.geometry}
        material={materials.Matériau}
        position={textPosition}
        rotation={textRotation}
      />
    </group>
  );
}

export default Text;

useGLTF.preload("/models/items/text.glb");
