import React, { useEffect, useRef } from "react";
import { useAnimations, useGLTF, useTexture } from "@react-three/drei";
import { useControls } from "leva";

export const ArrowNav = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/arrowNav.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    // actions[names[0]].play().fadeIn(0.1).play();
    // actions[names[1]].reset().fadeIn(0.1).play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Scene">
        <group name="Cube_0" />
        <group name="RootNode">
          <group
            name="CINEMA_4D_Editor"
            position={[1621.037, 3436.833, -8719.761]}
            rotation={[-Math.PI, -1.277, 2.793]}
          >
            <group name="Object_5" position={[0, 0, 0]} />
          </group>
          <group
            name="Cube_2"
            position={[-2.121, 1852.212, 0]}
            rotation={[Math.PI / 2, Math.PI / 4, 0]}
            scale={0.953}
          />
        </group>
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="7dd6bac68a78478f96774c2b32872855fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode001">
                <group
                  name="CINEMA_4D_Editor001"
                  position={[1621.037, 3436.833, -8719.76]}
                  rotation={[-Math.PI, -1.277, 2.793]}
                >
                  <group name="Object_5001" position={[-0.001, -0.001, 0]} />
                </group>
                <group
                  name="Cube_2001"
                  position={[-35.295, 779.579, 53.807]}
                  rotation={[-Math.PI / 2, 0.64, Math.PI]}
                  scale={[0.167, 0.537, 0.185]}
                />
              </group>
            </group>
          </group>
        </group>
        <mesh
          name="Cube_1"
          castShadow
          receiveShadow
          geometry={nodes.Cube_1.geometry}
          material={props.whiteMaterial}
          position={[3.116, 0.902, 0.538]}
          rotation={[-Math.PI, 0, 0.744]}
          scale={[0.001, 0.001, 0.005]}
        />
        <mesh
          name="Cube"
          castShadow
          receiveShadow
          geometry={nodes.Cube.geometry}
          material={props.whiteMaterial}
          position={[2.313, 0.868, 0.538]}
          rotation={[-Math.PI, 0, 0.744]}
          scale={[0.001, 0.001, 0.005]}
        />
      </group>
    </group>
  );
};

useGLTF.preload("/models/arrowNav.glb");
