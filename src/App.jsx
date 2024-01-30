import React, { useCallback, useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { Canvas } from "@react-three/fiber";
import { CameraControls, Html, Stats } from "@react-three/drei";
import { button, useControls } from "leva";

import Scene from "./scene/Scene";
import Description from "./description/Description";

import "./styles/style.css";

const App = () => {
  const controls = useRef();
  const meshFitCameraHome = useRef();

  const intro = async () => {
    controls.current.dolly(-22);
    controls.current.smoothTime = 0.5;
    controls.current.dolly(22, true);
  };

  useControls("dolly", {
    in: button(() => {
      controls.current.dolly(22, true);
    }),
    out: button(() => {
      controls.current.smoothTime = 0.5;
      controls.current.dolly(-22, true);
    }),
  });

  const { toneMappingExposure, cameraPosition } = useControls({
    toneMappingExposure: 0.8,
    cameraPosition: [-17, 22, 23],
  });

  const [isBlurred, setIsBlurred] = useState(false);
  const [active, setActive] = useState(0);
  const [index, setIndex] = useState(0);

  const handleBlur = useCallback(() => {
    setIsBlurred(!isBlurred);
    setActive(Number(!active));
  }, [isBlurred]);

  // useEffect(() => {
  //   if (controls.current) {
  //     intro();
  //   }
  // }, [intro]);

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
        <CameraControls ref={controls} />
        <Html className="title">
          <div>
            Youcef Ettaieb
            <div className="subtitle">Front End Developer</div>
          </div>
        </Html>
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
