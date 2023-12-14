import React, { useEffect, useRef } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";

const Crab = (props) => {
  const group = useRef();
  const { nodes, materials, animations } = useGLTF("/models/animals/crab.glb");
  const { actions, names } = useAnimations(animations, group);

  useEffect(() => {
    actions[names[0]].reset().fadeIn(0.5).play();
  }, []);

  return (
    <group ref={group} {...props} dispose={null} scale={2}>
      <group name="Sketchfab_Scene">
        <group
          name="Sketchfab_model"
          rotation={[-Math.PI / 2, 0, 0]}
          scale={0.003}
        >
          <group
            name="a1be649ed8a74f12ba544e8e91112780fbx"
            rotation={[Math.PI / 2, 0, 0]}
          >
            <group name="Object_2">
              <group name="RootNode">
                <group
                  name="_CrabBody"
                  position={[0, 24.5, 0]}
                  rotation={[-Math.PI / 2, 0, 0]}
                >
                  <group name="Object_5" position={[20.593, -3.894, -21.056]}>
                    <mesh
                      name="_CrabBody__0"
                      castShadow
                      receiveShadow
                      geometry={nodes._CrabBody__0.geometry}
                      material={materials["Scene_-_Root"]}
                    />
                  </group>
                  <group
                    name="_Crabarm4"
                    position={[-18.443, 10.876, -12.029]}
                    rotation={[-0.82, -0.903, 0.632]}
                  >
                    <group
                      name="Object_8"
                      position={[-1.512, 0, -4.454]}
                      rotation={[0, 0.087, 0]}
                    >
                      <mesh
                        name="_Crabarm4__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm4__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_CrabLeg3"
                      position={[0, 1.065, 27.167]}
                      rotation={[-1.222, 0, 0]}
                    >
                      <group
                        name="Object_11"
                        position={[-1.512, 0, -9.711]}
                        rotation={[0, 0.087, 0]}
                      >
                        <mesh
                          name="_CrabLeg3__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._CrabLeg3__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm3"
                    position={[-25.039, 0.124, -12.029]}
                    rotation={[0, -1.134, Math.PI / 2]}
                  >
                    <group
                      name="Object_14"
                      position={[-1.512, 0, -4.454]}
                      rotation={[0, 0.087, 0]}
                    >
                      <mesh
                        name="_Crabarm3__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm3__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_CrabLeg2"
                      position={[0, 1.065, 27.167]}
                      rotation={[-1.222, 0, 0]}
                    >
                      <group
                        name="Object_17"
                        position={[-1.512, 0, -9.711]}
                        rotation={[0, 0.087, 0]}
                      >
                        <mesh
                          name="_CrabLeg2__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._CrabLeg2__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm2"
                    position={[-25.17, -13.899, -12.029]}
                    rotation={[0.82, -0.903, 2.51]}
                  >
                    <group
                      name="Object_20"
                      position={[-1.512, 0, -4.454]}
                      rotation={[0, 0.087, 0]}
                    >
                      <mesh
                        name="_Crabarm2__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm2__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_CrabLeg1"
                      position={[0, 1.065, 27.167]}
                      rotation={[-1.222, 0, 0]}
                    >
                      <group
                        name="Object_23"
                        position={[-1.512, 0, -9.711]}
                        rotation={[0, 0.087, 0]}
                      >
                        <mesh
                          name="_CrabLeg1__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._CrabLeg1__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm1"
                    position={[-17.049, -18.697, -13.209]}
                    rotation={[-2.098, 0.706, 1.131]}
                  >
                    <group name="Object_26" position={[0, 0, -34.494]}>
                      <mesh
                        name="_Crabarm1__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm1__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_Claw1"
                      position={[0, 1.279, -35.511]}
                      rotation={[-2.731, -1.304, -1.894]}
                    >
                      <group
                        name="Object_29"
                        position={[-24.629, -7.389, -10.5]}
                      >
                        <mesh
                          name="_Claw1__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._Claw1__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                      <group
                        name="_ClawFinger1"
                        position={[-24.565, -12.713, 10.318]}
                        rotation={[3.077, 0.03, -1.184]}
                      >
                        <group name="Object_32" position={[1.96, -1.049, 0]}>
                          <mesh
                            name="_ClawFinger1__0"
                            castShadow
                            receiveShadow
                            geometry={nodes._ClawFinger1__0.geometry}
                            material={materials["Scene_-_Root"]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm5"
                    position={[13.81, -18.697, -13.209]}
                    rotation={[-1.999, 0.395, 0.944]}
                  >
                    <group
                      name="Object_35"
                      position={[16.819, -25.305, -18.89]}
                    >
                      <mesh
                        name="_Crabarm5__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm5__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_Claw002"
                      position={[16.819, -24.026, -19.907]}
                      rotation={[0.947, -0.661, 1.41]}
                    >
                      <group
                        name="Object_38"
                        position={[-24.629, -7.389, -10.5]}
                      >
                        <mesh
                          name="_Claw002__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._Claw002__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                      <group
                        name="_ClawFinger002"
                        position={[-22.54, 11.544, 15.241]}
                        rotation={[-2.895, 0.089, -1.233]}
                      >
                        <group
                          name="Object_41"
                          position={[-22.068, 5.344, -0.816]}
                          rotation={[0, -0.262, 0]}
                        >
                          <mesh
                            name="_ClawFinger002__0"
                            castShadow
                            receiveShadow
                            geometry={nodes._ClawFinger002__0.geometry}
                            material={materials["Scene_-_Root"]}
                          />
                        </group>
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm7"
                    position={[25.012, 0.257, -12.029]}
                    rotation={[0, 1.134, -Math.PI / 2]}
                  >
                    <group
                      name="Object_44"
                      position={[-1.512, 0, -4.454]}
                      rotation={[0, 0.087, 0]}
                    >
                      <mesh
                        name="_Crabarm7__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm7__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_CrabLeg5"
                      position={[0, 1.065, 27.167]}
                      rotation={[-1.222, 0, 0]}
                    >
                      <group
                        name="Object_47"
                        position={[-1.512, 0, -9.711]}
                        rotation={[0, 0.087, 0]}
                      >
                        <mesh
                          name="_CrabLeg5__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._CrabLeg5__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm8"
                    position={[18.349, 10.992, -12.029]}
                    rotation={[-0.82, 0.903, -0.632]}
                  >
                    <group
                      name="Object_50"
                      position={[-1.512, 0, -4.454]}
                      rotation={[0, 0.087, 0]}
                    >
                      <mesh
                        name="_Crabarm8__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm8__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_CrabLeg6"
                      position={[0, 1.065, 27.167]}
                      rotation={[-1.222, 0, 0]}
                    >
                      <group
                        name="Object_53"
                        position={[-1.512, 0, -9.711]}
                        rotation={[0, 0.087, 0]}
                      >
                        <mesh
                          name="_CrabLeg6__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._CrabLeg6__0.geometry}
                          material={materials["Scene_-_Root"]}
                        />
                      </group>
                    </group>
                  </group>
                  <group
                    name="_Crabarm6"
                    position={[25.21, -13.783, -12.029]}
                    rotation={[0.82, 0.903, -2.51]}
                  >
                    <group
                      name="Object_56"
                      position={[-1.512, 0, -4.454]}
                      rotation={[0, 0.087, 0]}
                    >
                      <mesh
                        name="_Crabarm6__0"
                        castShadow
                        receiveShadow
                        geometry={nodes._Crabarm6__0.geometry}
                        material={materials["Scene_-_Root"]}
                      />
                    </group>
                    <group
                      name="_CrabLeg4"
                      position={[0, 1.065, 27.167]}
                      rotation={[-1.222, 0, 0]}
                    >
                      <group
                        name="Object_59"
                        position={[-1.512, 0, -9.711]}
                        rotation={[0, 0.087, 0]}
                      >
                        <mesh
                          name="_CrabLeg4__0"
                          castShadow
                          receiveShadow
                          geometry={nodes._CrabLeg4__0.geometry}
                          material={materials["Scene_-_Root"]}
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
    </group>
  );
};

useGLTF.preload("/models/animals/crab.glb");

export default Crab;
