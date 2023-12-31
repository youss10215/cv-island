import React from "react";
import { useGLTF } from "@react-three/drei";
import { useControls } from "leva";

export const Sign = (props) => {
  const { nodes, materials } = useGLTF("/models/items/sign.glb");
  const { signRotation } = useControls({ signRotation: [0, -0.6, 0] });
  return (
    <group {...props} dispose={null} scale={2}>
      <mesh
        castShadow
        receiveShadow={false}
        geometry={nodes.Object_4.geometry}
        material={materials.Signpost_Tall_Baked_Dark}
        rotation={signRotation}
      />
    </group>
  );
};

useGLTF.preload("/models/items/sign.glb");

export default Sign;
