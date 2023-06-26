import React, { useEffect, useMemo, useRef, useState } from 'react';
import * as THREE from "three";
import { Canvas, useFrame } from '@react-three/fiber';
import { Environment, OrbitControls, PerspectiveCamera } from '@react-three/drei';
import './styles/style.css';

import { BoxGeometry, Vector2, Vector3, CylinderGeometry, Mesh, MeshStandardMaterial } from "https://cdn.skypack.dev/three@0.137";
import { mergeBufferGeometries } from "https://cdn.skypack.dev/three-stdlib@2.8.5/utils/BufferGeometryUtils";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";


const Boxes = ({ i, j }) => {
  const tempBoxes = new THREE.Object3D();
  const material = new THREE.MeshLambertMaterial({ color: "white" });
  const boxesGeometry = new THREE.CylinderGeometry(1, 1, 4, 6, 1, false);
  const ref = useRef();

  const SIZE_X = 1.77;
  const SIZE_Y = 1.535;

  const [size, setSize] = useState({x: 0, y: 0});

  // const xPosition = (i + (j % 2) * 0.5) * 1.77;
  // const yPosition = j * 1.535;
  const tilePosition = (tileX, tileY) => {
    return new THREE.Vector3((tileX + (tileY % 2) * 0.5) * SIZE_X, tileY * SIZE_Y);
  }

  const centerPosition = [-(SIZE_X * i) / 2, 0, -(SIZE_Y * j) / 2];
  // console.log('🚀 ~ file: App.jsx:30 ~ Boxes ~ centerPosition:', centerPosition)

  useFrame(() => {
    let counter = 0;
    // const simplex = new SimplexNoise();
    for (let x = 0; x < i; x++) {
      for (let z = 0; z < j; z++) {
        let newPosition = tilePosition(x, z);
        
        const id = counter++;
        
        if (newPosition.distanceTo(new THREE.Vector3(-1 * centerPosition[0], -1 * centerPosition[2])) > 10) {
          // if (newPosition.length() > 24) {
            continue
          };
          
        // let noise = (simplex.noise2D(x * 0.1, z* 0.1) + 1) * 0.5;
        // noise = Math.pow(noise, 1.5);

        tempBoxes.position.set(newPosition.x, 0, newPosition.y);
        tempBoxes.updateMatrix();
        ref.current.setMatrixAt(id, tempBoxes.matrix);

          if (z === j - 1 && x === i - 1) {
            console.log('🚀 ~ file: App.jsx:58 ~ useFrame ~ id:', id)
          }
      }
    }

    ref.current.instanceMatrix.needsUpdate = true;
  });
  
  return <instancedMesh  position={centerPosition} ref={ref} args={[boxesGeometry, material, i * j]} />;
};

const App = () => {
  const ref = useRef();

  let hexagonGeometries = new BoxGeometry(0,0,0);

  const hexGeometry = (height, position) => {
    let geo = new CylinderGeometry(1, 1, height, 6, 1, false);
    // geo.translate(position.x, height * 0.5, position.y);

    return geo;
  };

  const makeHex = (height, position) => {
    let geo = hexGeometry(height, position);
    hexagonGeometries = mergeBufferGeometries([hexagonGeometries, geo]);
  };
  
  const hexagons = useMemo(() => {
    return (
      <mesh>
        <cylinderBufferGeometry attach="geometry" args={[1, 1, 3, 6, 1, false]} />
        <meshStandardMaterial
          attach="material"
          // envMap='/textures/envmap.hdr'
          flatShading={true}
        />
      </mesh>
    )
  }, []);

  const material = new THREE.MeshLambertMaterial({ color: "white" });
  const boxesGeometry = new THREE.CylinderGeometry(1, 1, 4, 6, 1, false);
  return (
    <Canvas
      // camera={{ position: [-17, 31, 33] }}
    >
      {/* <instancedMesh args={[boxesGeometry, material, 1]} /> */}
      <pointLight position={[5, 5, 5]} />
      <OrbitControls />
      <color attach="background" args={['#FFEECC']} />
      <PerspectiveCamera fov={45} />
      <Environment preset='city' files="/textures/envmap.hdr" />
      {/* {hexagons} */}
      <Boxes
        i={15}
        j={15}
      />
    </Canvas>
  );
}

export default App;
