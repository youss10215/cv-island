import React, { Suspense, useEffect, useMemo, useReducer } from "react";
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
  const { Tree, Animal, texture } = elements;
  const initialState = {
    hexagons: {
      level5: HEXAGON,
      level4: HEXAGON,
      level3: HEXAGON,
      level2: HEXAGON,
      level1: HEXAGON,
      treePositions: [],
      animalPositions: [],
    },
    size: 1,
  };

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });

  const [state, dispatch] = useReducer(reducer, initialState);
  const { hexagons, size } = state;

  let level5 = HEXAGON;
  let level4 = HEXAGON;
  let level3 = HEXAGON;
  let level2 = HEXAGON;
  let level1 = HEXAGON;
  let treePositions = [];
  let animalPositions = [];

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
  }, []);

  const renderTrees = useMemo(() => {
    // const Tree = React.lazy(() => import("../models/wild/trees/" + tree));
    return (state.treePositions || []).map((position, i) => {
      return <Tree key={i} position={position} />;
    });
  }, [treePositions, Tree]);

  const renderAnimals = useMemo(() => {
    // const Animal = React.lazy(() => import("../models/animals/" + animal));
    return (state.animalPositions || []).map((position, i) => {
      return (
        <Animal
          key={i}
          position={position}
          rotation={[0, Math.random() * i, 0]}
        />
      );
    });
  }, [animalPositions, Animal]);

  useEffect(() => {
    let counter = 0;

    const simplex = new SimplexNoise();
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
          level5 = BufferGeometryUtils.mergeGeometries([level5, hexagonStone]);
        } else if (height > LEVEL4_HEIGHT) {
          level4 = BufferGeometryUtils.mergeGeometries([level4, hexagonStone]);
        } else if (height > LEVEL3_HEIGHT) {
          level3 = BufferGeometryUtils.mergeGeometries([level3, hexagonStone]);
          if (Math.random() > 0.9) {
            treePositions.push([newPosition.x, height, newPosition.y]);
          }
        } else if (height > LEVEL2_HEIGHT) {
          level2 = BufferGeometryUtils.mergeGeometries([level2, hexagonStone]);

          if (Math.random() > 0.9) {
            animalPositions.push([newPosition.x, height, newPosition.y]);
          }
        } else if (height > LEVEL1_HEIGHT) {
          level1 = BufferGeometryUtils.mergeGeometries([level1, hexagonStone]);
        }

        counter++;
      }
    }

    dispatch({
      type: SET_HEGAGONS,
      payload: {
        hexagons: {
          level5,
          level4,
          level3,
          level2,
          level1,
        },
      },
    });

    dispatch({
      type: SET_POSITION,
      payload: {
        treePositions,
        animalPositions,
      },
    });
  }, [i, j]);

  return (
    <>
      {clouds}
      {renderTrees}
      {renderAnimals}
      <HexagonsMeshes hexagons={hexagons} size={size} texture={texture} />
    </>
  );
});

export default Hexagons;
