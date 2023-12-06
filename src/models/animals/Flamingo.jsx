import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const Flamingo = (props) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/animals/flamingo.glb"
  );
  const { actions, names } = useAnimations(animations, group);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={2}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.35}
        >
          <group
            name="1d56e73ff4bd40888aa0ae03b345b264fbx"
            rotation={[Math.PI / 2, 0, 0]}
            scale={0.01}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="flamingo_nadine"
                  position={[0, -73.082, 0]}
                  rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                  scale={31.558}
                />
                <group
                  name="Armature"
                  position={[33.807, 19.485, -3.352]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_6">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_9"
                      geometry={nodes.Object_9.geometry}
                      material={materials.flamingo}
                      skeleton={nodes.Object_9.skeleton}
                    />
                    {/* <group
                      name="Object_8"
                      position={[0, -73.082, 0]}
                      rotation={[-Math.PI / 2, Math.PI / 2, 0]}
                      scale={31.558}
                    /> */}
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

useGLTF.preload("/models/animals/flamingo.glb");

export default Flamingo;
