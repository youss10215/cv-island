import React, { useEffect, useRef, useState, useReducer } from "react";
import * as THREE from "three";
import "../styles/style.css";

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import { SIDE } from "../App";

import reducer, { SET_HEGAGONS, SET_SIZE } from "./reducer";
import HexagonsMeshes from "../hexagons-meshes/HexagonsMeshes";

export const MAX_HEIGHT = 10;

const STONE_HEIGHT = MAX_HEIGHT * 0.8;
const DIRT_HEIGHT = MAX_HEIGHT * 0.7;
const GRASS_HEIGHT = MAX_HEIGHT * 0.5;
const SAND_HEIGHT = MAX_HEIGHT * 0.3;
const DIRT2_HEIGHT = MAX_HEIGHT * 0;
const HEXAGON = new THREE.CylinderGeometry(1, 1, 0, 6, 1, false);

const SIZE_X = 1.7;
const SIZE_Y = 1.5;

const tilePosition = (tileX, tileY) => {
  return new THREE.Vector3(
    (tileX + (tileY % 2) * 0.5) * SIZE_X,
    tileY * SIZE_Y
  );
};

const Hexagons = React.memo(({ i, j }) => {
  const initialState = {
    hexagons: {
      stone: HEXAGON,
      dirt: HEXAGON,
      grass: HEXAGON,
      sand: HEXAGON,
      dirt2: HEXAGON,
    },
    size: 1,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const { hexagons, size } = state;

  let stone = HEXAGON;
  let dirt = HEXAGON;
  let grass = HEXAGON;
  let sand = HEXAGON;
  let dirt2 = HEXAGON;

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

        if (height > STONE_HEIGHT) {
          stone = BufferGeometryUtils.mergeGeometries([stone, hexagonStone]);
        } else if (height > DIRT_HEIGHT) {
          dirt = BufferGeometryUtils.mergeGeometries([dirt, hexagonStone]);
        } else if (height > GRASS_HEIGHT) {
          grass = BufferGeometryUtils.mergeGeometries([grass, hexagonStone]);
        } else if (height > SAND_HEIGHT) {
          sand = BufferGeometryUtils.mergeGeometries([sand, hexagonStone]);
        } else if (height > DIRT2_HEIGHT) {
          dirt2 = BufferGeometryUtils.mergeGeometries([dirt2, hexagonStone]);
        }

        counter++;
      }
    }

    dispatch({
      type: SET_HEGAGONS,
      payload: {
        hexagons: {
          stone,
          dirt,
          grass,
          sand,
          dirt2,
        },
      },
    });
  }, [i, j]);

  return <HexagonsMeshes hexagons={hexagons} size={size} />;
});

export default Hexagons;
