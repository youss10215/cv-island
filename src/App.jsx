import React, { useCallback, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";

import "./styles/style.css";
import Scene from "./Scene";
import { useControls } from "leva";

import Text from "./models/Text";

const App = () => {
  const { toneMappingExposure, cameraPosition } = useControls({
    toneMappingExposure: 0.8,
    cameraPosition: [-20, 16, 28],
  });
  const [isBlurred, setIsBlurred] = useState(false);

  const handleBlur = useCallback(() => {
    setIsBlurred(!isBlurred);
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
        {isBlurred && <Text />}
      </Canvas>
    </>
  );
};

export default App;
