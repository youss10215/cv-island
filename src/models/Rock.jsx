import React, { useRef } from "react";
import { useGLTF } from "@react-three/drei";

export function Rock(props) {
  const { nodes, materials } = useGLTF("/models/rock.gltf");
  return (
    <group {...props} dispose={null}>
      <group rotation={[-Math.PI / 2, 0, 0]} scale={1.5}>
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000.geometry}
          material={materials["Rock.001"]}
        />
        <mesh
          castShadow
          receiveShadow
          geometry={nodes.Cube000_1.geometry}
          material={materials["Snow.001"]}
        />
      </group>
    </group>
  );
}

export default Rock;

useGLTF.preload("/models/rock.gltf");
