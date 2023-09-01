import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const PalmTree = (props) => {
  const { nodes, materials } = useGLTF("/models/palmTree.glb");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder037.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder037_1.geometry}
          material={materials.Green}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder037_2.geometry}
          material={materials.DarkGreen}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cylinder037_3.geometry}
          material={materials.Coconuts}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/palmTree.glb");

export default PalmTree;
