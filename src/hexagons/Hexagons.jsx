import React, { useEffect, useMemo, useState, useReducer } from "react";
import * as THREE from "three";
import "../styles/style.css";

import * as BufferGeometryUtils from "three/examples/jsm/utils/BufferGeometryUtils.js";
import SimplexNoise from "https://cdn.skypack.dev/simplex-noise@3.0.0";

import reducer, { SET_HEGAGONS, SET_SIZE, SET_POSITION } from "./reducer";
import HexagonsMeshes from "../hexagons-meshes/HexagonsMeshes";
import { useEnvironment } from "@react-three/drei";
import PineTree from "../models/PineTree";

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

const Hexagons = React.memo(({ i, j }) => {
  const initialState = {
    hexagons: {
      stone: HEXAGON,
      dirt: HEXAGON,
      grass: HEXAGON,
      sand: HEXAGON,
      dirt2: HEXAGON,
      tree: <PineTree position={[0, 0, 0]} />,
      treePositions: [],
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
  let tree = <PineTree position={[0, 0, 0]} />;
  let treePositions = [];

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
    return (state.treePositions || []).map((position, i) => {
      return <PineTree key={i} position={position} />;
    });
  }, [treePositions]);

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
        } else if (height > GRASS_HEIGHT) {
          grass = BufferGeometryUtils.mergeGeometries([grass, hexagonStone]);
          if (Math.random() > 0.9) {
            tree = (
              <PineTree position={[newPosition.x, height, newPosition.y]} />
            );
            treePositions.push(tree.props.position);
          }
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
          tree,
        },
      },
    });

    dispatch({
      type: SET_POSITION,
      payload: {
        treePositions,
      },
    });
  }, [i, j]);

  return (
    <>
      {clouds}
      {renderTrees}
      <HexagonsMeshes hexagons={hexagons} size={size} />
      {/* <Instances
        limit={1000} // Optional: max amount of items (for calculating buffer size)
        range={1000} // Optional: draw-range
      >
        <meshStandardMaterial />
        <Instance
          color="red"
          scale={2}
          position={[-17, 10, -11]}
          rotation={[Math.PI / 3, 0, 0]}
        >

        </Instance>
      </Instances> */}
    </>
  );
});

export default Hexagons;
