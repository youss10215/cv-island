import React, { useEffect, useMemo, useState, useReducer } from "react";
import * as THREE from "three";
import "../styles/style.css";

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import reducer, { SET_HEGAGONS, SET_SIZE } from "./reducer";
import HexagonsMeshes from "../hexagons-meshes/HexagonsMeshes";
import { useEnvironment } from "@react-three/drei";

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

const rock = (height, position) => {
  const px = Math.random() * 0.4;
  const pz = Math.random() * 0.4;

  const geo = new THREE.SphereGeometry(Math.random() * 0.3 + 0.1, 7, 7);
  geo.translate(position.x + px, height, position.y + pz);

  return geo;
};

const tree = (height, position) => {
  const treeHeight = Math.random() * 1 + 1.25;

  const geo = new THREE.CylinderGeometry(0, 1.5, treeHeight, 3);
  geo.translate(position.x, height + treeHeight * 0 + 1, position.y);

  const geo2 = new THREE.CylinderGeometry(0, 1.15, treeHeight, 3);
  geo2.translate(position.x, height + treeHeight * 0.6 + 1, position.y);

  const geo3 = new THREE.CylinderGeometry(0, 0.8, treeHeight, 3);
  geo3.translate(position.x, height + treeHeight * 1.25 + 1, position.y);

  return BufferGeometryUtils.mergeGeometries([geo, geo2, geo3]);
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

  const envMap = useEnvironment({ files: "/textures/envmap.hdr" });

  const [state, dispatch] = useReducer(reducer, initialState);
  const { hexagons, size } = state;

  let stone = HEXAGON;
  let dirt = HEXAGON;
  let grass = HEXAGON;
  let sand = HEXAGON;
  let dirt2 = HEXAGON;

  const clouds = useMemo(() => {
    let geo = new THREE.SphereGeometry(0, 0, 0);
    let count = Math.floor(Math.pow(Math.random(), 0.45) * 4);

    const cloudMaterial = new THREE.MeshPhysicalMaterial({
      envMap,
      envMapIntensity: 0.75,
      flatShading: true,
    });

    for (let i = 0; i < count; i++) {
      const puff1 = new THREE.SphereGeometry(1.2, 7, 7);
      const puff2 = new THREE.SphereGeometry(1.5, 7, 7);
      const puff3 = new THREE.SphereGeometry(0.9, 7, 7);

      puff1.translate(-1.85, 4, 0);
      puff2.translate(0, 4, 0);
      puff3.translate(1.85, 4, 0);

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

    return <mesh args={[geo]} material={cloudMaterial} />;
  }, []);

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

          if (Math.random() > STONE_HEIGHT) {
            stone = BufferGeometryUtils.mergeGeometries([
              stone,
              rock(height, newPosition),
            ]);
          }
        } else if (height > DIRT_HEIGHT) {
          dirt = BufferGeometryUtils.mergeGeometries([dirt, hexagonStone]);

          if (Math.random() > 0.8) {
            grass = BufferGeometryUtils.mergeGeometries([
              grass,
              tree(height, newPosition),
            ]);
          }
        } else if (height > GRASS_HEIGHT) {
          grass = BufferGeometryUtils.mergeGeometries([grass, hexagonStone]);
        } else if (height > SAND_HEIGHT) {
          sand = BufferGeometryUtils.mergeGeometries([sand, hexagonStone]);

          if (Math.random() > 0.8 && stone) {
            stone = BufferGeometryUtils.mergeGeometries([
              stone,
              rock(height, newPosition),
            ]);
          }
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

  return (
    <>
      {clouds}
      <HexagonsMeshes hexagons={hexagons} size={size} />
    </>
  );
});

export default Hexagons;
