import React, { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import { useTexture } from "@react-three/drei"
import '../styles/style.css';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import { SIDE } from '../App';

export const MAX_HEIGHT = 10;

const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;
const HEXAGON = new THREE.CylinderGeometry(1, 1, 0, 6, 1, false);

const SIZE_X = 1.77;
const SIZE_Y = 1.535;

const tilePosition = (tileX, tileY) => {
  return new THREE.Vector3((tileX + (tileY % 2) * 0.5) * SIZE_X, tileY * SIZE_Y);
};


const loader = new THREE.TextureLoader();
const materialStone = new THREE.MeshPhysicalMaterial({
  map: loader.load('/textures/stone.png'),
  envMapIntensity: 0.75, 
  flatShading: true,
});
const materialDirt = new THREE.MeshPhysicalMaterial({
  map: loader.load('/textures/dirt.png'),
  envMapIntensity: 0.75, 
  flatShading: true,
});
const materialGrass = new THREE.MeshPhysicalMaterial({ 
  map: loader.load('/textures/grass.jpg'),
  envMapIntensity: 0.75, 
  flatShading: true,
});
const materialSand = new THREE.MeshPhysicalMaterial({ 
  map: loader.load('/textures/sand.jpg'),
  envMapIntensity: 0.75, 
  flatShading: true,
});
const materialDirt2 = new THREE.MeshPhysicalMaterial({ 
  map: loader.load('/textures/dirt2.jpg'),
  envMapIntensity: 0.75, 
  flatShading: true,
});

const Hexagons = ({ i, j }) => {
  const ref = useRef();

  const [stone, setStoneHex] = useState(HEXAGON);
  const [dirtHex, setDirtHex] = useState(HEXAGON);
  const [grassHex, setGrassHex] = useState(HEXAGON);
  const [sandHex, setSandHex] = useState(HEXAGON);
  const [dirt2Hex, setDirt2Hex] = useState(HEXAGON);
  const [size, setSize] = useState(1);

  
  let blobStone = HEXAGON;
  let blobDirt = HEXAGON;
  let blobGrass = HEXAGON;
  let blobSand = HEXAGON;
  let blobDirt2 = HEXAGON;

  
  useEffect(() => {
    let counter = 0;

    const simplex = new SimplexNoise();
    for (let x = -SIDE; x < i; x++) {
      for (let z = -SIDE; z < j; z++) {
        const noise = (simplex.noise2D(x * 0.1, z* 0.1) + 1) * 0.5;
        const height = (Math.pow(noise, 1.5) * MAX_HEIGHT);

        const newPosition = tilePosition(x, z);

        if (z === (j - 1) && x === (i - 1)) {
          setSize(counter);
        }
        
        if (newPosition.length() > 16) {
          continue;
        }

        const hexagonStone = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
        hexagonStone.translate(newPosition.x, height * 0.5, newPosition.y);

        if (height > STONE_HEIGHT) {
          blobStone = BufferGeometryUtils.mergeGeometries([blobStone, hexagonStone]);
        }
        else if (height > DIRT_HEIGHT) {
          blobDirt = BufferGeometryUtils.mergeGeometries([blobDirt, hexagonStone]);
        }
        else if (height > GRASS_HEIGHT) {
          blobGrass = BufferGeometryUtils.mergeGeometries([blobGrass, hexagonStone]);
        }
        else if (height > SAND_HEIGHT) {
          blobSand = BufferGeometryUtils.mergeGeometries([blobSand, hexagonStone]);
        }
        else if (height > DIRT2_HEIGHT) {
          blobDirt2 = BufferGeometryUtils.mergeGeometries([blobDirt2, hexagonStone]);
        }
        
        counter++;
      }
    }

    setStoneHex(blobStone);
    setDirtHex(blobDirt);
    setGrassHex(blobGrass);
    setSandHex(blobSand);
    setDirt2Hex(blobDirt2);

  }, [i, j]);

  return (
    <>
      <instancedMesh
        ref={ref}
        args={[stone, materialStone, size]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={ref}
        args={[dirtHex, materialDirt, size]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={ref}
        args={[grassHex, materialGrass, size]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={ref}
        args={[sandHex, materialSand, size]}
        castShadow
        receiveShadow
      />
      <instancedMesh
        ref={ref}
        args={[dirt2Hex, materialDirt2, size]}
        castShadow
        receiveShadow
      />
    </>
  );
};

export default Hexagons;