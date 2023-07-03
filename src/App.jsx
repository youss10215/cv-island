import React from 'react';
import * as THREE from "three";
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Hexagons from './hexagons/Hexagons';
import './styles/style.css';

export const SIDE = 15;

const App = () => {
  return (
    <Canvas
      // camera={{ position: [0, 0, 50] }}
      camera={{ position: [-17, 20, 23] }}
      gl={{ antialias: true, toneMapping: THREE.NoToneMapping }}
      linear
      shadows={{ type: THREE.PCFSoftShadowMap }}
    >
      <pointLight
        color="#FFCB8E"
        intensity={0.8}
        distance ={50}
        position={[4, 15, 2]}
        // shadow-camera-near={0.5}
        // shadow-camera-far={50}
        castShadow
        shadow-mapSize-width={512}
        shadow-mapSize-height={512}
      />
      {/* <ambientLight/> */}
      <OrbitControls target={[0, 0, 0]}/>
      <color attach="background" args={['#FFEECC']} />
      <PerspectiveCamera fov={45} />
      <Environment preset='city' files="/textures/envmap.hdr" />
      <Hexagons i={SIDE} j={SIDE} />
    </Canvas>
  );
}

export default App;
