import React from 'react';
import { Canvas } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import Hexagons from './Hexagons';
import './styles/style.css';

export const SIDE = 15;

const App = () => {
  return (
    <Canvas
      // camera={{ position: [0, 0, 50] }}
      camera={{ position: [-17, 31, 33] }}
    >
      <pointLight position={[0, 10, 0]} />
      <ambientLight intensity={0.3} />
      <OrbitControls />
      <color attach="background" args={['#FFEECC']} />
      <PerspectiveCamera fov={45} />
      <Environment preset='city' files="/textures/envmap.hdr" />
      <Hexagons i={SIDE} j={SIDE} />
    </Canvas>
  );
}

export default App;
