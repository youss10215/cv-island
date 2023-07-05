import { useRef } from 'react';
import { Environment, OrbitControls, PerspectiveCamera, useHelper } from '@react-three/drei';
import * as THREE from "three";

import Hexagons from './hexagons/Hexagons';
import { SIDE } from './App';
import { EffectComposer, HueSaturation, ToneMapping } from '@react-three/postprocessing';
import { BlendFunction } from 'postprocessing';

const Scene = () => {
  const lightRef = useRef();

  useHelper(lightRef, THREE.PointLightHelper, 1, 'hotpink')

  return (
    <>
      <pointLight
        ref={lightRef}
        color={new THREE.Color("#FFCB8E").convertSRGBToLinear()}
        intensity={2}
        distance={200}
        position={[10, 20, 10]}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />
      <ambientLight color={new THREE.Color("#ffe8bc").convertSRGBToLinear()} intensity={0.4} />
      <OrbitControls target={[0, 0, 0]} />
      <color attach="background" args={['#FFEECC']} />
      <PerspectiveCamera fov={45} />
      {/* <Environment preset='sunset' /> */}
      <Hexagons i={SIDE} j={SIDE} />
      {/* <EffectComposer> */}
        <ToneMapping
          blendFunction={BlendFunction.NORMAL} // blend mode
          adaptive={true} // toggle adaptive luminance map usage
          resolution={512} // texture resolution of the luminance map
          middleGrey={1} // middle grey factor
          maxLuminance={16.0} // maximum luminance
          averageLuminance={2.0} // average luminance
          adaptationRate={1.0} // luminance adaptation rate
        />
      {/* </EffectComposer> */}
    </>
  );
}

export default Scene;
