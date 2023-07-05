import React from 'react';
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';

import './styles/style.css';
import Scene from './Scene';

export const SIDE = 15;

const App = () => {
  return (
    <Canvas
      // camera={{ position: [0, 0, 50] }}
      camera={{ position: [-17, 20, 23] }}
      shadows
        gl={{
          antialias: true,
          toneMappingExposure: 0.8,
          shadowMap: {
            enabled: true,
            type: THREE.PCFSoftShadowMap
          },
          outputEncoding: THREE.SRGBColorSpace
        }}
    >
      <Scene />
    </Canvas>
  );
}

export default App;
