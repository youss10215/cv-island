import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const Penguin = (props) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/animals/penguin.glb"
  );
  const { actions, names } = useAnimations(animations, group);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[names[1]].reset().fadeIn(0.5).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.0035}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="ee3fc61dae304d61bcd529d66822f459fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="PenguinArmature"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_28"
                      geometry={nodes.Object_28.geometry}
                      material={materials.Material}
                      skeleton={nodes.Object_28.skeleton}
                    />
                    <group
                      name="Object_27"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={100}
                    />
                  </group>
                </group>
                <group
                  name="Penguin"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={100}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};
useGLTF.preload("/models/animals/penguin.glb");

export default Penguin;
