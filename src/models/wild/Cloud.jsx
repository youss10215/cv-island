import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const Cloud = (props) => {
  const { nodes, materials } = useGLTF("/models/wild/cloud.gltf");
  return (
    <group {...props} dispose={null}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cloud_3.geometry}
        material={materials.Cloud}
      />
    </group>
  );
};

useGLTF.preload("/models/wild/cloud.gltf");

export default Cloud;
