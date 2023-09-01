import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

const SnowTree = (props) => {
  const { nodes, materials } = useGLTF("/models/Willow_Snow_5.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube141.geometry}
          material={materials.Wood}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube141_1.geometry}
          material={materials.DarkGreen}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube141_2.geometry}
          material={materials.Snow}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/Willow_Snow_5.gltf");

export default SnowTree;
