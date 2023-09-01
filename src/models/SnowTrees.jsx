import { useGLTF, Instances, Instance } from "@react-three/drei";
import React from "react";

const SnowTrees = ({ data, ...props }) => {
  console.log("🚀 ~ file: SnowTrees.jsx:5 ~ SnowTrees ~ props:", props);
  console.log("🚀 ~ file: SnowTrees.jsx:5 ~ SnowTrees ~ data:", data);
  const { nodes, materials } = useGLTF("/models/Willow_Snow_5.gltf");

  return (
    <Instances>
      <group>
        {data.map(() => {
          <Instance>
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
          </Instance>;
        })}
      </group>
    </Instances>
  );
};

useGLTF.preload("/models/Willow_Snow_5.gltf");

export default SnowTrees;
