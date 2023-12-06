import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const SnowlyOwl = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF(
    "/models/animals/snowlyOwl.glb"
  );
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null} scale={0.7}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.147}
        >
          <group name="Root">
            <group
              name="Sun"
              position={[-4.323, -22.57, 15.986]}
              rotation={[0.934, -0.304, -0.195]}
            >
              <group name="Sun_1" />
            </group>
            <group name="Armature" position={[0, 0.748, -0.934]}>
              <primitive object={nodes.Armature_rootJoint} />
              <skinnedMesh
                name="Cube_0"
                geometry={nodes.Cube_0.geometry}
                material={materials.Eyes}
                skeleton={nodes.Cube_0.skeleton}
              />
              <skinnedMesh
                name="Plane_0"
                geometry={nodes.Plane_0.geometry}
                material={materials.Material}
                skeleton={nodes.Plane_0.skeleton}
              />
              <group name="Cube" position={[0, -4.415, 4.174]} />
              <group name="Plane" position={[0, -1.748, 0.934]} />
            </group>
          </group>
        </group>
      </group>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.147}
        >
          <group name="Root">
            <group
              name="Sun"
              position={[-4.323, -22.57, 15.986]}
              rotation={[0.934, -0.304, -0.195]}
            >
              <group name="Sun_1" />
            </group>
            <group name="Armature" position={[0, 0.748, -0.934]}>
              <primitive object={nodes.Armature_rootJoint} />
              <skinnedMesh
                name="Cube_0"
                geometry={nodes.Cube_0.geometry}
                material={materials.Eyes}
                skeleton={nodes.Cube_0.skeleton}
              />
              <skinnedMesh
                name="Plane_0"
                geometry={nodes.Plane_0.geometry}
                material={materials.Material}
                skeleton={nodes.Plane_0.skeleton}
              />
              <group name="Cube" position={[0, -4.415, 4.174]} />
              <group name="Plane" position={[0, -1.748, 0.934]} />
            </group>
          </group>
        </group>
      </group>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.147}
        >
          <group name="Root">
            <group
              name="Sun"
              position={[-4.323, -22.57, 15.986]}
              rotation={[0.934, -0.304, -0.195]}
            >
              <group name="Sun_1" />
            </group>
            <group name="Armature" position={[0, 0.748, -0.934]}>
              <primitive object={nodes.Armature_rootJoint} />
              <skinnedMesh
                name="Cube_0"
                geometry={nodes.Cube_0.geometry}
                material={materials.Eyes}
                skeleton={nodes.Cube_0.skeleton}
              />
              <skinnedMesh
                name="Plane_0"
                geometry={nodes.Plane_0.geometry}
                material={materials.Material}
                skeleton={nodes.Plane_0.skeleton}
              />
              <group name="Cube" position={[0, -4.415, 4.174]} />
              <group name="Plane" position={[0, -1.748, 0.934]} />
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/animals/snowlyOwl.glb");

export default SnowlyOwl;
