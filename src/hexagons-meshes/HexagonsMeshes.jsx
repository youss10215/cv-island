import React, { useMemo } from "react";
import * as THREE from "three";

import { useTexture } from "@react-three/drei";

const HexagonsMeshes = ({ hexagons, size }) => {
  const [stoneTexture] = useTexture(["/textures/stone.png"]);
  const [dirtTexture] = useTexture(["/textures/dirt.png"]);
  const [grassTexture] = useTexture(["/textures/grass.png"]);
  const [sandTexture] = useTexture(["/textures/sand.png"]);
  const [dirt2Texture] = useTexture(["/textures/dirt2.png"]);

  const geo = useMemo(() => {
    return [
      {
        key: "stone",
        material: new THREE.MeshPhysicalMaterial({
          map: stoneTexture,
          envMapIntensity: 0.75,
          flatShading: true,
        }),
      },
      {
        key: "dirt",
        material: new THREE.MeshPhysicalMaterial({
          map: dirtTexture,
          envMapIntensity: 0.75,
          flatShading: true,
        }),
      },
      {
        key: "grass",
        material: new THREE.MeshPhysicalMaterial({
          map: grassTexture,
          envMapIntensity: 0.75,
          flatShading: true,
        }),
      },
      {
        key: "sand",
        material: new THREE.MeshPhysicalMaterial({
          map: sandTexture,
          envMapIntensity: 0.75,
          flatShading: true,
        }),
      },
      {
        key: "dirt2",
        material: new THREE.MeshPhysicalMaterial({
          map: dirt2Texture,
          envMapIntensity: 0.75,
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
