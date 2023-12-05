import React, { useMemo, useRef } from "react";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const WinterTree = (props) => {
  const { scene, materials } = useGLTF("/models/winterTree.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder076.geometry}
        material={materials.Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder076_1.geometry}
        material={materials.Green}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder076_2.geometry}
        material={materials.Snow}
      />
    </group>
  );
};

useGLTF.preload("/models/winterTree.glb");

export default WinterTree;
