import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './styles/style.css';

import * as BufferGeometryUtils from 'three/examples/jsm/utils/BufferGeometryUtils.js';

// import { mergeBufferGeometries } from "https://cdn.skypack.dev/three-stdlib@2.8.5/utils/BufferGeometryUtils";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";


const SIZE_X = 1.77;
const SIZE_Y = 1.535;

const tilePosition = (tileX, tileY) => {
  return new THREE.Vector3((tileX + (tileY % 2) * 0.5) * SIZE_X, tileY * SIZE_Y);
};

const Hexagons = ({ i, j }) => {
  const ref = useRef();
  const material = new THREE.MeshLambertMaterial({ color: "white" });
  const [hexagons, setHexagons] = useState(new THREE.CylinderGeometry(1, 1, 3, 6, 1, false));
  const [size, setSize] = useState(i * j);

  let counter = 0;
  
  useEffect(() => {
    let blob = new THREE.CylinderGeometry(1, 1, 4, 6, 1, false);

    for (let x = -10; x < i; x++) {
      for (let z = -10; z < j; z++) {
        const hexagonGeometry = new THREE.CylinderGeometry(1, 1, 4, 6, 1, false);
        const newPosition = tilePosition(x, z);
        hexagonGeometry.translate(newPosition.x, 0, newPosition.y);

        if (z === (j - 1) && x === (i - 1)) {
          setSize(counter);
        }
        
        if (newPosition.length() > 15) {
          continue;
        }

        counter++;

        blob = BufferGeometryUtils.mergeGeometries([blob, hexagonGeometry]);
      }
    }

    setHexagons(blob);

  }, [i, j, counter]);

  return <instancedMesh ref={ref} args={[hexagons, material, size]} />;
}


const Boxes = ({ i, j }) => {
  const tempBoxes = useMemo(() => new THREE.Object3D(), []);
  const material = new THREE.MeshLambertMaterial({ color: "white" });
  const boxesGeometry = new THREE.CylinderGeometry(1, 1, 4, 6, 1, false);
  const ref = useRef();

  const [size, setCounter] = useState(i * j);
  let counter = 0;

  useEffect(() => {
    // const simplex = new SimplexNoise();
    for (let x = -10; x < i; x++) {
      for (let z = -10; z < j; z++) {
        const newPosition = tilePosition(x, z);
        
        if (z === (j - 1) && x === (i - 1)) {
          setCounter(counter)
        }
        
        if (newPosition.length() > 15) {
          continue
        }
          
        // let noise = (simplex.noise2D(x * 0.1, z* 0.1) + 1) * 0.5;
        // noise = Math.pow(noise, 1.5);
        const id = counter++;

        tempBoxes.position.set(newPosition.x, 0, newPosition.y);
        tempBoxes.updateMatrix();
        ref.current.setMatrixAt(id, tempBoxes.matrix);
      }
    }

    ref.current.instanceMatrix.needsUpdate = true;
  }, [i, j, tempBoxes, size, counter]);

  return <instancedMesh key={size} ref={ref} args={[boxesGeometry, material, size]} />;
};

const App = () => {
  return (
    <Canvas
      camera={{ position: [-17, 31, 33] }}
    >
      {/* <instancedMesh args={[boxesGeometry, material, 1]} /> */}
      <pointLight position={[5, 5, 5]} />
      <OrbitControls />
      <color attach="background" args={['#FFEECC']} />
      <PerspectiveCamera fov={45} />
      <Environment preset='city' files="/textures/envmap.hdr" />
      {/* {hexagons} */}
      <Hexagons i={10} j={10} />
      {/* <Boxes i={10} j={10} /> */}
    </Canvas>
  );
}

export default App;
