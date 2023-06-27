import React, { useEffect, useRef, useState } from 'react';
import * as THREE from "three";
import './styles/style.css';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import { SIDE } from './App';

const SIZE_X = 1.77;
const SIZE_Y = 1.535;
const MAX_HEIGHT = 10;

const tilePosition = (tileX, tileY) => {
  return new THREE.Vector3((tileX + (tileY % 2) * 0.5) * SIZE_X, tileY * SIZE_Y);
};

const Hexagons = ({ i, j }) => {
  const ref = useRef();
  const material = new THREE.MeshLambertMaterial({ color: "white" });
  const [hexagons, setHexagons] = useState(new THREE.CylinderGeometry(1, 1, 3, 6, 1, false));
  const [size, setSize] = useState(1);

  
  useEffect(() => {
    let blob = new THREE.CylinderGeometry(1, 1, 0, 6, 1, false);
    let counter = 0;

    const simplex = new SimplexNoise();
    for (let x = -SIDE; x < i; x++) {
      for (let z = -SIDE; z < j; z++) {
        const noise = (simplex.noise2D(x * 0.1, z* 0.1) + 1) * 0.5;
        const height = (Math.pow(noise, 1.5) * MAX_HEIGHT);
        const hexagonGeometry = new THREE.CylinderGeometry(1, 1, height, 6, 1, false);
        const newPosition = tilePosition(x, z);

        if (z === (j - 1) && x === (i - 1)) {
          setSize(counter);
        }
        
        if (newPosition.length() > 16) {
          continue;
        }


        hexagonGeometry.translate(newPosition.x, height * 0.5, newPosition.y);
        blob = BufferGeometryUtils.mergeGeometries([blob, hexagonGeometry]);

        counter++;
      }
    }

    setHexagons(blob);

  }, [i, j]);

  return <instancedMesh ref={ref} args={[hexagons, material, size]} />;
};

export default Hexagons;