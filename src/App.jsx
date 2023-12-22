import React, { useCallback, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { Stats } from "@react-three/drei";
import { useControls } from "leva";

import Scene from "./scene/Scene";
import Description from "./description/Description";

import "./styles/style.css";

const App = () => {
  const { toneMappingExposure, cameraPosition } = useControls({
    toneMappingExposure: 0.8,
    cameraPosition: [-17, 9, 23],
  });

  const [isBlurred, setIsBlurred] = useState(false);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);

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
        <Scene
          handleBlur={handleBlur}
          isBlurred={isBlurred}
          index={index}
          setIndex={setIndex}
        />
        <Stats />
      </Canvas>
      <Description active={active} index={index} />
    </>
  );
};

export default App;
