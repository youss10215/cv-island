import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const Rock = (props) => {
  const { scene, materials } = useGLTF("/models/rock.gltf");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

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
};

export default Rock;

useGLTF.preload("/models/rock.gltf");
