import React, { useMemo } from "react";
import * as THREE from "three";

import { useEnvironment, useTexture } from "@react-three/drei";
import { useControls } from "leva";

const HexagonsMeshes = ({ hexagons, size }) => {
  const [stoneTexture] = useTexture(["/textures/stone.jpg"]);
  const [dirtTexture] = useTexture(["/textures/dirt.jpg"]);
  const [grassTexture] = useTexture(["/textures/grass.jpg"]);
  const [sandTexture] = useTexture(["/textures/sand.jpg"]);
  const [dirt2Texture] = useTexture(["/textures/dirt2.jpg"]);

  const { lightIntensity } = useControls({ lightMapIntensity: 0.4 });

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });

  const geo = useMemo(() => {
    return [
      {
        key: "stone",
        material: new THREE.MeshPhysicalMaterial({
          map: stoneTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
          lightIntensity,
        }),
      },
      {
        key: "dirt",
        material: new THREE.MeshPhysicalMaterial({
          map: dirtTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
          lightIntensity,
        }),
      },
      {
        key: "grass",
        material: new THREE.MeshPhysicalMaterial({
          map: grassTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
          lightIntensity,
        }),
      },
      {
        key: "sand",
        material: new THREE.MeshPhysicalMaterial({
          map: sandTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
          lightIntensity,
        }),
      },
      {
        key: "dirt2",
        material: new THREE.MeshPhysicalMaterial({
          map: dirt2Texture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
          lightIntensity,
        }),
      },
    ];
  }, [stoneTexture, dirtTexture, grassTexture, sandTexture, dirt2Texture]);

  const renderHexagons = useMemo(() => {
    return geo.map(({ key, material }, i) => {
      return (
        <mesh
          key={`${key}-${i}`}
          args={[hexagons[key], null, size]}
          material={material}
          castShadow
          receiveShadow
        />
      );
    });
  }, [hexagons, size]);

  if (!hexagons) {
    return;
  }

  return renderHexagons;
};

export default HexagonsMeshes;
