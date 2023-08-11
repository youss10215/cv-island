import { useRef } from "react";
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  useEnvironment,
  useHelper,
  useTexture,
} from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";

import Hexagons from "./hexagons/Hexagons";
import { MAX_HEIGHT } from "./hexagons/Hexagons";
import {
  EffectComposer,
  HueSaturation,
  ToneMapping,
} from "@react-three/postprocessing";
import { BlendFunction } from "postprocessing";

const defaultProps = {
  pointLightColor: "#FFCB8E",
  pointLightIntensity: 2,
  pointLightPosition: [10, 20, 10],
  sides: 15,
  seaColor: "#10579d",
};

const Scene = () => {
  const lightRef = useRef();
  const {
    pointLightColor,
    pointLightIntensity,
    pointLightPosition,
    sides,
    seaColor,
  } = useControls(defaultProps);

  useHelper(lightRef, THREE.PointLightHelper, 1, "hotpink");

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });
  const [waterTexture] = useTexture(["/textures/water.png"]);
  const [dirtTexture] = useTexture(["/textures/dirt.png"]);
  const [dirt2Texture] = useTexture(["/textures/dirt2.png"]);
  const seaTexture = new THREE.MeshPhysicalMaterial({
    envMap,
    color: new THREE.Color(seaColor).convertLinearToSRGB().multiplyScalar(3),
    ior: 1.4,
    transmission: 1,
    transparent: true,
    thickness: 1.5,
    envMapIntensity: 0.2,
    roughness: 1,
    metalness: 0.025,
    roughnessMap: waterTexture,
    metalnessMap: waterTexture,
  });

  const mapContainerTexture = new THREE.MeshPhysicalMaterial({
    envMap,
    map: dirtTexture,
    envMapIntensity: 0.2,
    side: THREE.DoubleSide,
  });

  const mapFloorTexture = new THREE.MeshPhysicalMaterial({
    envMap,
    map: dirt2Texture,
    envMapIntensity: 0.1,
    side: THREE.DoubleSide,
  });

  return (
    <>
      <pointLight
        ref={lightRef}
        color={new THREE.Color(pointLightColor).convertSRGBToLinear()}
        intensity={pointLightIntensity}
        distance={200}
        position={pointLightPosition}
        castShadow
        shadow-mapSize-height={512}
        shadow-mapSize-width={512}
        shadow-camera-near={0.5}
        shadow-camera-far={500}
      />
      <ambientLight
        color={new THREE.Color("#ffe8bc").convertSRGBToLinear()}
        intensity={0.4}
      />
      <OrbitControls target={[0, 0, 0]} />
      <color attach="background" args={["#FFEECC"]} />
      <PerspectiveCamera fov={45} />
      {/* <Environment preset='sunset' /> */}
      <Hexagons i={sides} j={sides} />
      <mesh material={seaTexture} position={[0, MAX_HEIGHT * 0.1, 0]}>
        <cylinderGeometry args={[sides + 2, sides + 2, MAX_HEIGHT * 0.2, 50]} />
      </mesh>
      <mesh
        material={mapContainerTexture}
        position={[0, MAX_HEIGHT * 0.125, 0]}
      >
        <cylinderGeometry
          args={[sides + 2.1, sides + 2.1, MAX_HEIGHT * 0.25, 50, 1, true]}
        />
      </mesh>
      <mesh
        material={mapFloorTexture}
        position={[0, -MAX_HEIGHT * 0.05, 0]}
        receiveShadow
      >
        <cylinderGeometry
          args={[sides + 3.5, sides + 3.5, MAX_HEIGHT * 0.1, 50]}
        />
      </mesh>
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
};

export default Scene;
