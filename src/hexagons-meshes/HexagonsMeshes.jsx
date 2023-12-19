import React, { useMemo } from "react";
import * as THREE from "three";

import { useEnvironment, useTexture } from "@react-three/drei";
import { useControls } from "leva";

const LEVEL1 = "level1";
const LEVEL2 = "level2";
const LEVEL3 = "level3";
const LEVEL4 = "level4";
const LEVEL5 = "level5";

const HexagonsMeshes = ({ hexagons, size, texture }) => {
  const [stoneTexture] = useTexture([`/textures/stone.jpg`]);
  const [dirtTexture] = useTexture(["/textures/dirt.jpg"]);
  const [grassTexture] = useTexture(["/textures/grass.jpg"]);
  const [sandTexture] = useTexture(["/textures/sand.jpg"]);
  const [dirt2Texture] = useTexture(["/textures/dirt2.jpg"]);
  const [greenTexture] = useTexture(["/textures/green.jpg"]);
  const [darkStoneTexture] = useTexture(["/textures/darkStone.jpg"]);
  const [whiteTexture] = useTexture(["/textures/white.jpg"]);
  const [blueIceTexture] = useTexture(["/textures/blueIce.jpg"]);
  const [blueIce2Texture] = useTexture(["/textures/blueIce2.jpg"]);
  const [iceTexture] = useTexture(["/textures/ice.jpg"]);
  const [mapFloorTexture] = useTexture(["/textures/mapFloor.jpg"]);
  const [darkGrassTexture] = useTexture(["/textures/darkGrass.jpg"]);
  const [lightBrownTexture] = useTexture(["/textures/lightBrown.jpg"]);
  const [lightStoneTexture] = useTexture(["/textures/lightStone.jpg"]);
  const [brownTexture] = useTexture(["/textures/brown.jpg"]);

  const { lightIntensity } = useControls({ lightMapIntensity: 0.4 });

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });

  const stone = new THREE.MeshPhysicalMaterial({
    map: stoneTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const grass = new THREE.MeshPhysicalMaterial({
    map: grassTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const green = new THREE.MeshPhysicalMaterial({
    map: greenTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const mapFloor = new THREE.MeshPhysicalMaterial({
    map: mapFloorTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const sand = new THREE.MeshPhysicalMaterial({
    map: sandTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const dirt = new THREE.MeshPhysicalMaterial({
    map: dirtTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const dirt2 = new THREE.MeshPhysicalMaterial({
    map: dirt2Texture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const darkStone = new THREE.MeshPhysicalMaterial({
    map: darkStoneTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const blueIce = new THREE.MeshPhysicalMaterial({
    map: blueIceTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const blueIce2 = new THREE.MeshPhysicalMaterial({
    map: blueIce2Texture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const ice = new THREE.MeshPhysicalMaterial({
    map: iceTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const white = new THREE.MeshPhysicalMaterial({
    map: whiteTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const darkGrass = new THREE.MeshPhysicalMaterial({
    map: darkGrassTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const lightBrown = new THREE.MeshPhysicalMaterial({
    map: lightBrownTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const brown = new THREE.MeshPhysicalMaterial({
    map: brownTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const lightStone = new THREE.MeshPhysicalMaterial({
    map: lightStoneTexture,
    envMap,
    envMapIntensity: 0.7,
    flatShading: true,
    lightIntensity,
  });

  const geo = useMemo(() => {
    return {
      summer: [
        {
          key: LEVEL5,
          material: dirt,
        },
        {
          key: LEVEL4,
          material: darkGrass,
        },
        {
          key: LEVEL3,
          material: grass,
        },
        {
          key: LEVEL2,
          material: mapFloor,
        },
        {
          key: LEVEL1,
          material: sand,
        },
      ],
      autumn: [
        {
          key: LEVEL5,
          material: dirt,
        },
        {
          key: LEVEL4,
          material: dirt,
        },
        {
          key: LEVEL3,
          material: darkGrass,
        },
        {
          key: LEVEL2,
          material: sand,
        },
        {
          key: LEVEL1,
          material: dirt2,
        },
      ],
      winter: [
        {
          key: LEVEL5,
          material: darkStone,
        },
        {
          key: LEVEL4,
          material: blueIce,
        },
        {
          key: LEVEL3,
          material: blueIce2,
        },
        {
          key: LEVEL2,
          material: ice,
        },
        {
          key: LEVEL1,
          material: white,
        },
      ],
      spring: [
        {
          key: LEVEL5,
          material: lightStone,
        },
        {
          key: LEVEL4,
          material: darkGrass,
        },
        {
          key: LEVEL3,
          material: grass,
        },
        {
          key: LEVEL2,
          material: brown,
        },
        {
          key: LEVEL1,
          material: lightBrown,
        },
      ],
    };
  }, [
    stone,
    grass,
    green,
    mapFloor,
    sand,
    dirt,
    dirt2,
    darkStone,
    blueIce,
    blueIce2,
    ice,
    white,
  ]);

  const renderHexagons = useMemo(() => {
    return geo[texture].map((item, i) => {
      const { key, material } = item;
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
  }, [hexagons, size, geo, texture]);

  if (!hexagons) {
    return;
  }

  return renderHexagons;
};

export default HexagonsMeshes;
