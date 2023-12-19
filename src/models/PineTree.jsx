import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

const PineTree = (props) => {
  const { scene, materials } = useGLTF("/models/wild/trees/pineTree.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder028.geometry}
        material={materials.Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder028_1.geometry}
        material={materials.Green}
      />
    </group>
  );
};

useGLTF.preload("/models/wild/trees/pineTree.glb");

export default PineTree;
