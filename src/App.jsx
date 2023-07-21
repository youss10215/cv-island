import React from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

import "./styles/style.css";
import Scene from "./Scene";
import { useControls } from "leva";

export const SIDE = 15;

const App = () => {
  const { toneMappingExposure } = useControls({ toneMappingExposure: 0.8 });
  return (
    <>
      <Canvas
        // camera={{ position: [0, 0, 50] }}
        camera={{ position: [-17, 20, 23] }}
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
        <Scene />
        <Stats />
      </Canvas>
    </>
  );
};

export default App;
