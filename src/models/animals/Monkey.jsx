import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

export const Monkey = (props) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/animals/monkey.glb"
  );
  const { actions, names } = useAnimations(animations, group);
  const clone = useMemo(() => SkeletonUtils.clone(scene), [scene]);
  const { nodes } = useGraph(clone);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, [actions]);

  return (
    <group ref={group} {...props} dispose={null} scale={0.003}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="758e0a5f39e2446ebb739e0f059bb40afbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="hanuman_rig"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={266.191}
                >
                  <group name="Object_5">
                    <primitive object={nodes._rootJoint} />
                    <skinnedMesh
                      name="Object_166"
                      geometry={nodes.Object_166.geometry}
                      material={materials.body}
                      skeleton={nodes.Object_166.skeleton}
                    />
                    <skinnedMesh
                      name="Object_167"
                      geometry={nodes.Object_167.geometry}
                      material={materials.EYES}
                      skeleton={nodes.Object_167.skeleton}
                    />
                    <group
                      name="Object_165"
                      rotation={[-Math.PI / 2, 0, 0]}
                      scale={62.598}
                    />
                  </group>
                </group>
                <group
                  name="SALLY"
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={62.598}
                />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/animals/monkey.glb");

export default Monkey;
