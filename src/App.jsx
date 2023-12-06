import React, { useCallback, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { useControls } from "leva";

import { useSpring } from "@react-spring/core";
import { a } from "@react-spring/three";

import Scene from "./scene/Scene";

import Text from "./models/items/Text";
import "./styles/style.css";

const App = () => {
  const { toneMappingExposure, cameraPosition } = useControls({
    toneMappingExposure: 0.8,
    cameraPosition: [-17, 9, 23],
  });

  const [isBlurred, setIsBlurred] = useState(false);
  const [active, setActive] = useState(0);

  const mass = active ? 5 : 1;

  const { spring } = useSpring({
    spring: active,
    config: { mass, tension: 400, friction: 50, precision: 0.0001 },
  });

  const positionX = spring.to([0, 1], [-10.8, 30]);
  const positionY = spring.to([0, 1], [4, 3.3]);
  const positionZ = spring.to([0, 1], [14.6, 9]);
  const scaleX = spring.to([0, 1], [0, 15]);
  const scaleY = spring.to([0, 1], [0, 2.8]);
  const scaleZ = spring.to([0, 1], [0, 17]);
  const rotationX = spring.to([0, 1], [39.1, 39.1]);
  const rotationY = spring.to([0, 1], [0, 3]);
  const rotationZ = spring.to([0, 1], [5.4, 5.4]);

  const handleBlur = useCallback(() => {
    setIsBlurred(!isBlurred);
    setActive(Number(!active));
  }, [isBlurred]);

  return (
    <>
      <Canvas
        className={isBlurred ? "canvas-island" : ""}
        camera={{ position: cameraPosition }}
        shadows
        gl={{
          antialias: true,
          toneMappingExposure,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap,
          },
          outputEncoding: THREE.SRGBColorSpace,
        }}
      >
        <Scene handleBlur={handleBlur} isBlurred={isBlurred} />
        <Stats />
      </Canvas>
      <Canvas className="description" camera={{ position: cameraPosition }}>
        <a.mesh
          position-x={positionX}
          position-y={positionY}
          position-z={positionZ}
          rotation-x={rotationX}
          rotation-y={rotationY}
          rotation-z={rotationZ}
          scale-x={scaleX}
          scale-y={scaleY}
          scale-z={scaleZ}
        >
          <Text />
        </a.mesh>
      </Canvas>
    </>
  );
};

export default App;
