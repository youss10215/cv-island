import React, { useMemo } from "react";
import * as THREE from "three";

import { useEnvironment, useTexture } from "@react-three/drei";

const HexagonsMeshes = ({ hexagons, size }) => {
  const [stoneTexture] = useTexture(["/textures/stone.png"]);
  const [dirtTexture] = useTexture(["/textures/dirt.png"]);
  const [grassTexture] = useTexture(["/textures/grass.png"]);
  const [sandTexture] = useTexture(["/textures/sand.png"]);
  const [dirt2Texture] = useTexture(["/textures/dirt2.png"]);
  
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
        }),
      },
      {
        key: "dirt",
        material: new THREE.MeshPhysicalMaterial({
          map: dirtTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
        }),
      },
      {
        key: "grass",
        material: new THREE.MeshPhysicalMaterial({
          map: grassTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
        }),
      },
      {
        key: "sand",
        material: new THREE.MeshPhysicalMaterial({
          map: sandTexture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
        }),
      },
      {
        key: "dirt2",
        material: new THREE.MeshPhysicalMaterial({
          map: dirt2Texture,
          envMap,
          envMapIntensity: 0.7,
          flatShading: true,
        }),
      },
    ];
  }, [stoneTexture, dirtTexture, grassTexture, sandTexture, dirt2Texture]);

  const renderHexagons = useMemo(() => {
    return geo.map(({ key, material }, i) => {
      return (
        <instancedMesh
          key={`${key}-${i}`}
          args={[hexagons[key], material, size]}
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
