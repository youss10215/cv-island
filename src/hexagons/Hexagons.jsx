import React, { Suspense, useEffect, useMemo, useReducer, useRef } from "react";
import * as THREE from "three";
import { useEnvironment } from "@react-three/drei";

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import HexagonsMeshes from "../hexagons-meshes/HexagonsMeshes";
import reducer, { SET_HEGAGONS, SET_SIZE, SET_POSITION } from "./reducer";

export const MAX_HEIGHT = 10;

const LEVEL5_HEIGHT = MAX_HEIGHT * 0.8;
const LEVEL4_HEIGHT = MAX_HEIGHT * 0.7;
const LEVEL3_HEIGHT = MAX_HEIGHT * 0.5;
const LEVEL2_HEIGHT = MAX_HEIGHT * 0.3;
const LEVEL1_HEIGHT = MAX_HEIGHT * 0;
const HEXAGON = new THREE.CylinderGeometry(1, 1, 0, 6, 1, false);

const SIZE_X = 1.7;
const SIZE_Y = 1.5;

const tilePosition = (tileX, tileY) => {
  return new THREE.Vector3(
    (tileX + (tileY % 2) * 0.5) * SIZE_X,
    tileY * SIZE_Y
  );
};

const Hexagons = React.memo(({ i, j, elements }) => {
  const { treePath, animalPath, texture } = elements;
  const initialState = {
    hexagons: {
      level5: HEXAGON,
      level4: HEXAGON,
      level3: HEXAGON,
      level2: HEXAGON,
      level1: HEXAGON,
    },
    treePositions: [],
    animalPositions: [],
    size: 1,
  };

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });

  const [state, dispatch] = useReducer(reducer, initialState);
  const { hexagons, size, treePositions, animalPositions } = state;

  const level1 = useRef(HEXAGON);
  const level2 = useRef(HEXAGON);
  const level3 = useRef(HEXAGON);
  const level4 = useRef(HEXAGON);
  const level5 = useRef(HEXAGON);

  const clouds = useMemo(() => {
    let geo = new THREE.SphereGeometry(0, 0, 0);
    let count = Math.floor(Math.pow(Math.random(), 0.45) * 4);

    const cloudMaterial = new THREE.MeshPhysicalMaterial({
      envMap,
      envMapIntensity: 0.75,
    });

    for (let i = 0; i < count; i++) {
      const puff1 = new THREE.SphereGeometry(1.2, 7, 7);
      const puff2 = new THREE.SphereGeometry(1.5, 7, 7);
      const puff3 = new THREE.SphereGeometry(0.9, 7, 7);

      puff1.translate(-1.85, 5, 0);
      puff2.translate(0, 5, 0);
      puff3.translate(1.85, 5, 0);

      const cloudGeo = BufferGeometryUtils.mergeGeometries([
        puff1,
        puff2,
        puff3,
      ]);
      cloudGeo.translate(
        Math.random() * 20 - 10,
        Math.random() * 7 + 7,
        Math.random() * 20 - 10
      );
      cloudGeo.rotateY(Math.random() * Math.PI * 2);

      geo = BufferGeometryUtils.mergeGeometries([geo, cloudGeo]);
    }

    return <mesh args={[geo]} material={cloudMaterial} castShadow={true} />;
  }, [envMap]);

  const TreeComponent = useMemo(() => {
    const Component = React.lazy(() => import(`${treePath}.jsx`));
    return Component;
  }, [treePath]);

  const AnimalComponent = useMemo(() => {
    const Component = React.lazy(() => import(`${animalPath}.jsx`));
    return Component;
  }, [animalPath]);

  useEffect(() => {
    let counter = 0;

    const simplex = new SimplexNoise();
    const newTreePositions = [];
    const newAnimalPositions = [];
    for (let x = -i; x < i; x++) {
      for (let z = -j; z < j; z++) {
        const noise = (simplex.noise2D(x * 0.1, z * 0.1) + 1) * 0.5;
        const height = Math.pow(noise, 1.5) * MAX_HEIGHT;

        const newPosition = tilePosition(x, z);

        if (z === j - 1 && x === i - 1) {
          dispatch({ type: SET_SIZE, payload: { counter } });
        }

        if (newPosition.length() > i + 1) {
          continue;
        }

        const hexagonStone = new THREE.CylinderGeometry(
          1,
          1,
          height,
          6,
          1,
          false
        );

        hexagonStone.translate(newPosition.x, height * 0.5, newPosition.y);

        if (height > LEVEL5_HEIGHT) {
          level5.current = BufferGeometryUtils.mergeGeometries([
            level5.current,
            hexagonStone,
          ]);
        } else if (height > LEVEL4_HEIGHT) {
          level4.current = BufferGeometryUtils.mergeGeometries([
            level4.current,
            hexagonStone,
          ]);
        } else if (height > LEVEL3_HEIGHT) {
          level3.current = BufferGeometryUtils.mergeGeometries([
            level3.current,
            hexagonStone,
          ]);
          if (Math.random() > 0.9) {
            newTreePositions.push([newPosition.x, height, newPosition.y]);
          }
        } else if (height > LEVEL2_HEIGHT) {
          level2.current = BufferGeometryUtils.mergeGeometries([
            level2.current,
            hexagonStone,
          ]);

          if (Math.random() > 0.9) {
            newAnimalPositions.push([newPosition.x, height, newPosition.y]);
          }
        } else if (height > LEVEL1_HEIGHT) {
          level1.current = BufferGeometryUtils.mergeGeometries([
            level1.current,
            hexagonStone,
          ]);
        }

        counter++;
      }
    }

    dispatch({
      type: SET_HEGAGONS,
      payload: {
        hexagons: {
          level5: level5.current,
          level4: level4.current,
          level3: level3.current,
          level2: level2.current,
          level1: level1.current,
        },
      },
    });

    dispatch({
      type: SET_POSITION,
      payload: {
        treePositions: newTreePositions,
        animalPositions: newAnimalPositions,
      },
    });
  }, [i, j]);

  return (
    <>
      {clouds}
      {treePositions.map((position, i) => {
        return (
          <Suspense key={i} fallback={null}>
            <TreeComponent position={position} />;
          </Suspense>
        );
      })}
      {animalPositions.map((position, i) => {
        return (
          <Suspense key={i} fallback={null}>
            <AnimalComponent
              position={position}
              rotation={[0, Math.random() * i, 0]}
            />
            ;
          </Suspense>
        );
      })}
      <HexagonsMeshes hexagons={hexagons} size={size} texture={texture} />
    </>
  );
});

Hexagons.displayName = "Hexagons";

export default Hexagons;
