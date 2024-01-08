import React from "react";
import { Html } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { useSpring } from "react-spring";
import { a } from "@react-spring/three";
import { useControls } from "leva";

import Paper from "../models/Paper";

import { mapsElements } from "../scene/utils";
import LightDescription from "./LightDescription";

const Description = ({ active, index }) => {
  const { cameraPosition, decriptionPosition, decriptionRotation } =
    useControls({
      toneMappingExposure: 0.8,
      cameraPosition: [-17, 9, 23],
      decriptionPosition: [0, 5.3, -0.1],
      decriptionRotation: [1.7, 3.1, 0],
    });

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

  const {
    description: { title, text, marginTop },
  } = mapsElements[index];

  return (
    <Canvas
      className="container-description"
      camera={{ position: cameraPosition }}
    >
      <LightDescription />
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
        <Paper />
        <Html
          className="description"
          rotation={decriptionRotation}
          position={decriptionPosition}
          transform
          occlude
          scale={0.2}
        >
          <div className="title" style={{ marginTop }}>
            {title}
          </div>
          <div className="text" dangerouslySetInnerHTML={{ __html: text }} />
        </Html>
      </a.mesh>
    </Canvas>
  );
};

export default Description;
