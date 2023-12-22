import React, { useRef } from "react";
import * as THREE from "three";
import { useControls } from "leva";

export const LightDescription = () => {
  const {
    descriptionLightColor,
    descriptionLightIntensity,
    descriptionLightPosition,
  } = useControls({
    descriptionLightColor: "#FFF",
    descriptionLightIntensity: 4,
    descriptionLightPosition: [-15, 10, 15],
  });

  return (
    <pointLight
      color={new THREE.Color(descriptionLightColor).convertSRGBToLinear()}
      intensity={descriptionLightIntensity}
      distance={200}
      position={descriptionLightPosition}
    />
  );
};

export default LightDescription;
