import React, { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import './styles/style.css';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import { SIDE } from './App';


const SIZE_X = 1.77;
const SIZE_Y = 1.535;
const MAX_HEIGHT = 10;

const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;

const HEXAGON = new THREE.CylinderGeometry(1, 1, 3, 6, 1, false);


const tilePosition = (tileX, tileY) => {
  return new THREE.Vector3((tileX + (tileY % 2) * 0.5) * SIZE_X, tileY * SIZE_Y);
};

const loader = new THREE.TextureLoader();
const materialStone = new THREE.MeshLambertMaterial({ map: loader.load('/textures/stone.png')});
const materialDirt = new THREE.MeshLambertMaterial({ map: loader.load('/textures/dirt.png')});
const materialGrass = new THREE.MeshLambertMaterial({ map: loader.load('/textures/grass.jpg')});
const materialSand = new THREE.MeshLambertMaterial({ map: loader.load('/textures/sand.jpg')});
const materialDirt2 = new THREE.MeshLambertMaterial({ map: loader.load('/textures/dirt2.jpg')});

const Hexagons = ({ i, j }) => {
  const ref = useRef();

  const [stoneHex, setStoneHex] = useState(HEXAGON);
  const [dirtHex, setDirtHex] = useState(HEXAGON);
  const [grassHex, setGrassHex] = useState(HEXAGON);
  const [sandHex, setSandHex] = useState(HEXAGON);
  const [dirt2Hex, setDirt2Hex] = useState(HEXAGON);
  const [size, setSize] = useState(1);

  
  useEffect(() => {
    let blobStone = HEXAGON;
    let blobDirt = HEXAGON;
    let blobGrass = HEXAGON;
    let blobSand = HEXAGON;
    let blobDirt2 = HEXAGON;
    let counter = 0;

    const simplex = new SimplexNoise();
    for (let x = -SIDE; x < i; x++) {
      for (let z = -SIDE; z < j; z++) {
        const noise = (simplex.noise2D(x * 0.1, z* 0.1) + 1) * 0.5;
        const height = (Math.pow(noise, 1.5) * MAX_HEIGHT);

        const newPosition = tilePosition(x, z);

        const hexagonStone = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
        const hexagonDirt = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
        const hexagonGrass = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
        const hexagonSand = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
        const hexagonDirt2 = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);


        if (z === (j - 1) && x === (i - 1)) {
          setSize(counter);
        }
        
        if (newPosition.length() > 16) {
          continue;
        }


        hexagonStone.translate(newPosition.x, height * 0.5, newPosition.y);
        hexagonDirt.translate(newPosition.x, height * 0.5, newPosition.y);
        hexagonGrass.translate(newPosition.x, height * 0.5, newPosition.y);
        hexagonSand.translate(newPosition.x, height * 0.5, newPosition.y);
        hexagonDirt2.translate(newPosition.x, height * 0.5, newPosition.y);

        if (height > STONE_HEIGHT) {
          blobStone = BufferGeometryUtils.mergeGeometries([blobStone, hexagonStone]);
        }
        else if (height > DIRT_HEIGHT) {
          blobDirt = BufferGeometryUtils.mergeGeometries([blobDirt, hexagonDirt]);
        }
        else if (height > GRASS_HEIGHT) {
          blobGrass = BufferGeometryUtils.mergeGeometries([blobGrass, hexagonGrass]);
        }
        else if (height > SAND_HEIGHT) {
          blobSand = BufferGeometryUtils.mergeGeometries([blobSand, hexagonSand]);
        }
        else if (height > DIRT2_HEIGHT) {
          blobDirt2 = BufferGeometryUtils.mergeGeometries([blobDirt2, hexagonDirt2]);
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
      <instancedMesh ref={ref} args={[stoneHex, materialStone, size]} />
      <instancedMesh ref={ref} args={[dirtHex, materialDirt, size]} />
      <instancedMesh ref={ref} args={[grassHex, materialGrass, size]} />
      <instancedMesh ref={ref} args={[sandHex, materialSand, size]} />
      <instancedMesh ref={ref} args={[dirt2Hex, materialDirt2, size]} />
    </>
  );
};

export default Hexagons;