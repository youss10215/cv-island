import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const Rabbit = (props) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/animals/rabbit.glb"
  );
  const { actions, names } = useAnimations(animations, group);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.04}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="RabbitFBX" rotation={[Math.PI / 2, 0, 0]}>
            <group name="Object_2">
              <group name="RootNode">
                <group name="Object_4">
                  <primitive object={nodes._rootJoint} />
                  <skinnedMesh
                    name="Object_7"
                    geometry={nodes.Object_7.geometry}
                    material={materials.Main}
                    skeleton={nodes.Object_7.skeleton}
                  />
                  <group name="Object_6" rotation={[-Math.PI / 2, 0, 0]} />
                  <group name="Rabbit" rotation={[-Math.PI / 2, 0, 0]} />
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/animals/rabbit.glb");

export default Rabbit;
