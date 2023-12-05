import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const Flowers = (props) => {
  const { scene, materials } = useGLTF("/models/flowers.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029.geometry}
        material={materials.Green}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_1.geometry}
        material={materials.Cyan}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Plane029_2.geometry}
        material={materials.Yellow}
      />
    </group>
  );
};

useGLTF.preload("/models/flowers.glb");

export default Flowers;
