import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

const AutumnBird = (props) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/animals/autumnBird.glb"
  );
  const { actions, names } = useAnimations(animations, group);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.5}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={46.683}
        >
          <group
            name="bfb1ea86655f4c4ab4c6cbbb449cedf4fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="BirdOrange_all">
                  <group
                    name="Main"
                    position={[-0.083, 0, 0.451]}
                    rotation={[0, -0.074, 0]}
                  >
                    <group name="Object_6">
                      <primitive object={nodes._rootJoint} />
                      <skinnedMesh
                        name="Object_51"
                        geometry={nodes.Object_51.geometry}
                        material={materials.BirdOrange_LMB}
                        skeleton={nodes.Object_51.skeleton}
                      />
                      <group name="Object_50" />
                    </group>
                  </group>
                  <group name="Geometry">
                    <group name="BirdOrange" />
                  </group>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/animals/autumnBird.glb");

export default AutumnBird;
