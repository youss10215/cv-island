import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Seagulls = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/seagulls.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null}>
      <group name="Sketchfab_Scene">
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group
            name="a1c02e7101cb4c39b4bc90e8da607759fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group name="Shape001" rotation={[-Math.PI / 2, 0, 0]} />
                <group
                  name="Obj_Seagull__Seagull_m"
                  position={[22.222, 0, 14.523]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.139}
                />
                <group
                  name="Shape002"
                  position={[0, 3.432, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <group
                  name="Obj_Seagull__Seagull_m001"
                  position={[22.222, 3.432, 14.523]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.139}
                />
                <group
                  name="Shape003"
                  position={[0, 4.444, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <group
                  name="Obj_Seagull__Seagull_m002"
                  position={[22.222, 4.444, 14.523]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.139}
                />
                <group
                  name="Obj_Seagull__Seagull_m003"
                  position={[22.222, 7.877, 14.523]}
                  rotation={[-Math.PI / 2, 0, 0]}
                  scale={0.139}
                />
                <group
                  name="Shape004"
                  position={[0, 7.877, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                />
                <group name="Dummy001" position={[12.334, 5.076, 13.398]}>
                  <group
                    name="EnvironmentAmbientLight003"
                    position={[1.37, 4.037, 5.189]}
                    rotation={[-1.933, -0.405, 2.18]}
                    scale={0.139}
                  >
                    <group name="Object_14">
                      <primitive object={nodes._rootJoint} />
                      <skinnedMesh
                        name="Object_17"
                        geometry={nodes.Object_17.geometry}
                        material={materials.Seagull_m}
                        skeleton={nodes.Object_17.skeleton}
                      />
                      <group
                        name="Object_16"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={0.025}
                      />
                    </group>
                  </group>
                  <group
                    name="EnvironmentAmbientLight002"
                    position={[-5.201, 1.639, 5.111]}
                    rotation={[-1.715, 0.204, 0.828]}
                    scale={0.139}
                  >
                    <group name="Object_26">
                      <primitive object={nodes._rootJoint_1} />
                      <skinnedMesh
                        name="Object_29"
                        geometry={nodes.Object_29.geometry}
                        material={materials.Seagull_m}
                        skeleton={nodes.Object_29.skeleton}
                      />
                      <group
                        name="Object_28"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={0.025}
                      />
                    </group>
                  </group>
                  <group
                    name="EnvironmentAmbientLight001"
                    position={[-4.956, -1.665, -4.002]}
                    rotation={[-1.24, 0.524, -1.172]}
                    scale={0.139}
                  >
                    <group name="Object_38">
                      <primitive object={nodes._rootJoint_2} />
                      <skinnedMesh
                        name="Object_41"
                        geometry={nodes.Object_41.geometry}
                        material={materials.Seagull_m}
                        skeleton={nodes.Object_41.skeleton}
                      />
                      <group
                        name="Object_40"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={0.025}
                      />
                    </group>
                  </group>
                  <group
                    name="EnvironmentAmbientLight"
                    position={[5.81, -3.234, 0.65]}
                    rotation={[-1.548, -0.243, -2.967]}
                    scale={0.139}
                  >
                    <group name="Object_50">
                      <primitive object={nodes._rootJoint_3} />
                      <skinnedMesh
                        name="Object_53"
                        geometry={nodes.Object_53.geometry}
                        material={materials.Seagull_m}
                        skeleton={nodes.Object_53.skeleton}
                      />
                      <group
                        name="Object_52"
                        rotation={[-Math.PI / 2, 0, 0]}
                        scale={0.025}
                      />
                    </group>
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

useGLTF.preload("/models/seagulls.glb");

export default Seagulls;
