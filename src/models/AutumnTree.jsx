import React, { useMemo } from "react";
import { useGLTF } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const AutumnTree = (props) => {
  const { scene, materials } = useGLTF("/models/autumnTree.glb");
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  return (
    <group {...props} dispose={null} scale={1.5}>
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder061.geometry}
        material={materials.Wood}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder061_1.geometry}
        material={materials.Orange}
      />
      <mesh
        castShadow
        receiveShadow
        geometry={nodes.Cylinder061_2.geometry}
        material={materials.LightOrange}
      />
    </group>
  );
};

useGLTF.preload("/models/autumnTree.glb");

export default AutumnTree;
