import React, { useState } from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

const Paper = (props) => {
  const { nodes, materials } = useGLTF("/models/items/paper.glb");

  const { textPosition, textRotation } = useControls({
    textPosition: [0, 5.2, -0.2],
    textRotation: [1.7, 3.13, 0],
  });

  return (
    <group
      {...props}
      position={textPosition}
      rotation={textRotation}
      dispose={null}
    >
      <group scale={0.13}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Paper_Paper_0.geometry}
          material={materials.Paper}
        />
      </group>
    </group>
  );
};

export default Paper;

useGLTF.preload("/models/items/paper.glb");
