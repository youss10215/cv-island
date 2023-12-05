import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const PalmTree = (props) => {
  const { scene, materials } = useGLTF("/models/palmTree.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group {...props} dispose={null}>
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
  );
};

useGLTF.preload("/models/palmTree.glb");

export default PalmTree;
