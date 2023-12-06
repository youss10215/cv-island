import React, { useMemo } from "react";
import * as THREE from "three";

import { useEnvironment, useTexture } from "@react-three/drei";
import { useControls } from "leva";

const HexagonsMeshes = ({ hexagons, size, texture }) => {
  const [stoneTexture] = useTexture([`/textures/stone.jpg`]);
  const [dirtTexture] = useTexture(["/textures/dirt.jpg"]);
  const [grassTexture] = useTexture(["/textures/grass.jpg"]);
  const [sandTexture] = useTexture(["/textures/sand.jpg"]);
  const [dirt2Texture] = useTexture(["/textures/dirt2.jpg"]);
  const [yellowTexture] = useTexture(["/textures/yellow.jpg"]);
  const [greenTexture] = useTexture(["/textures/green.jpg"]);
  const [redTexture] = useTexture(["/textures/red.jpg"]);
  const [darkStoneTexture] = useTexture(["/textures/darkStone.jpg"]);
  const [whiteTexture] = useTexture(["/textures/white.jpg"]);
  const [blueIceTexture] = useTexture(["/textures/blueIce.jpg"]);
  const [blueIce2Texture] = useTexture(["/textures/blueIce2.jpg"]);
  const [iceTexture] = useTexture(["/textures/ice.jpg"]);
  const [ice2Texture] = useTexture(["/textures/ice2.jpg"]);
  const [mapFloorTexture] = useTexture(["/textures/mapFloor.jpg"]);

  const { lightIntensity } = useControls({ lightMapIntensity: 0.4 });

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });

  const geo = useMemo(() => {
    return {
      summer: [
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
            map: grassTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "grass",
          material: new THREE.MeshPhysicalMaterial({
            map: greenTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "sand",
          material: new THREE.MeshPhysicalMaterial({
            map: mapFloorTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "dirt2",
          material: new THREE.MeshPhysicalMaterial({
            map: sandTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
      ],
      autumn: [
        {
          key: "stone",
          material: new THREE.MeshPhysicalMaterial({
            map: dirtTexture,
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
      ],
      winter: [
        {
          key: "stone",
          material: new THREE.MeshPhysicalMaterial({
            map: darkStoneTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "dirt",
          material: new THREE.MeshPhysicalMaterial({
            map: blueIceTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "grass",
          material: new THREE.MeshPhysicalMaterial({
            map: blueIce2Texture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "sand",
          material: new THREE.MeshPhysicalMaterial({
            map: iceTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "dirt2",
          material: new THREE.MeshPhysicalMaterial({
            map: whiteTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
      ],
      spring: [
        {
          key: "stone",
          material: new THREE.MeshPhysicalMaterial({
            map: grassTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "dirt",
          material: new THREE.MeshPhysicalMaterial({
            map: sandTexture,
            envMap,
            envMapIntensity: 0.7,
            flatShading: true,
            lightIntensity,
          }),
        },
        {
          key: "grass",
          material: new THREE.MeshPhysicalMaterial({
            map: sandTexture,
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
      ],
    };
  }, [stoneTexture, dirtTexture, grassTexture, sandTexture, dirt2Texture]);

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
