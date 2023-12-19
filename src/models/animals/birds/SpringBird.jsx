import React, { useRef, useEffect, useMemo } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import { useGraph } from "@react-three/fiber";
import * as SkeletonUtils from "three/addons/utils/SkeletonUtils.js";

const SpringBird = (props) => {
  const group = useRef();
  const { scene, materials, animations } = useGLTF(
    "/models/animals/springBird.glb"
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
        <group name="Sketchfab_model" rotation={[-Math.PI / 2, 0, 0]}>
          <group name="Root">
            <group
              name="Galinha"
              position={[0, 0.019, 0.789]}
              rotation={[0, 0, -Math.PI]}
              scale={[0.543, 0.947, 0.947]}
            >
              <group
                name="galinha_esqueleto"
                position={[0, -0.02, -0.911]}
                rotation={[0, 0, -Math.PI]}
                scale={[1.843, 1.056, 1.056]}
              >
                <primitive object={nodes.galinha_esqueleto_rootJoint} />
              </group>
            </group>
            <group name="Ourico" scale={[0.353, 0.908, 0.444]}>
              <group
                name="ourico_esqueleto001"
                position={[0, 0.021, -0.851]}
                scale={[2.832, 1.101, 2.253]}
              >
                <primitive object={nodes.ourico_esqueleto001_rootJoint} />
              </group>
            </group>
            <group
              name="Raposa"
              position={[0, -16.047, -0.265]}
              scale={[0.353, 1.106, 0.769]}
            >
              <group
                name="raposa_esqueleto001"
                position={[0, 0.091, -1.085]}
                scale={[2.832, 0.904, 1.3]}
              >
                <primitive object={nodes.raposa_esqueleto001_rootJoint} />
              </group>
            </group>
            <group
              name="Toupeira"
              rotation={[0, 0, -Math.PI / 2]}
              scale={[0.353, 0.33, 0.547]}
            >
              <group
                name="toupeira_esqueleto001"
                position={[0, 0, -0.793]}
                scale={[2.832, 3.027, 1.828]}
              >
                <primitive object={nodes.toupeira_esqueleto001_rootJoint} />
              </group>
            </group>
            <group name="Passaro" scale={[0.353, 1.124, 0.299]}>
              <group
                name="passaro_esqueleto001"
                position={[0, -0.185, -0.546]}
                scale={[2.832, 0.89, 3.343]}
              >
                <primitive object={nodes.passaro_esqueleto001_rootJoint} />
                <skinnedMesh
                  name="passaro_modelo_0"
                  geometry={nodes.passaro_modelo_0.geometry}
                  material={materials.Passaro}
                  skeleton={nodes.passaro_modelo_0.skeleton}
                />
                <group name="passaro_modelo" />
              </group>
            </group>
            <group
              name="Ourico001"
              position={[0, -51.48, -0.643]}
              scale={[0.353, 0.908, 0.444]}
            >
              <group
                name="ourico_esqueleto"
                position={[0, 0.021, -0.851]}
                scale={[2.832, 1.101, 2.253]}
              >
                <primitive object={nodes.ourico_esqueleto_rootJoint} />
              </group>
            </group>
            <group
              name="Passaro001"
              position={[0, -61.906, 2.994]}
              scale={[0.353, 1.124, 0.299]}
            >
              <group
                name="passaro_esqueleto"
                position={[0, -0.185, -0.546]}
                scale={[2.832, 0.89, 3.343]}
              >
                <primitive object={nodes.passaro_esqueleto_rootJoint} />
              </group>
            </group>
            <group
              name="Toupeira001"
              position={[0, -65.207, -0.75]}
              rotation={[0, 0, -Math.PI / 2]}
              scale={[0.353, 0.33, 0.547]}
            >
              <group
                name="toupeira_esqueleto"
                position={[0, 0, -0.793]}
                scale={[2.832, 3.027, 1.828]}
              >
                <primitive object={nodes.toupeira_esqueleto_rootJoint} />
              </group>
            </group>
            <group
              name="Raposa001"
              position={[0, -81.222, -1.628]}
              scale={[0.353, 1.106, 0.769]}
            >
              <group
                name="raposa_esqueleto"
                position={[0, 0.091, -1.085]}
                scale={[2.832, 0.904, 1.3]}
              >
                <primitive object={nodes.raposa_esqueleto_rootJoint} />
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  );
};

useGLTF.preload("/models/animals/springBird.glb");

export default SpringBird;
