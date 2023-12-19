const TREE_PATH = '../models/wild/trees';
const ANIMAL_PATH = '../models/animals';
const BIRD_PATH = `${ANIMAL_PATH}/birds`;

export const mapsElements = [
  {
    treePath: `${TREE_PATH}/PineTree`,
    birdPath: `${BIRD_PATH}/SpringBirds`,
    animalPath: `${ANIMAL_PATH}/Rabbit`,
    texture: 'spring'
  },
  {
    treePath: `${TREE_PATH}/PalmTree`,
    birdPath: `${BIRD_PATH}/Seagulls`,
    animalPath: `${ANIMAL_PATH}/Crab`,
    texture: 'summer'
  }, {
    treePath: `${TREE_PATH}/AutumnTree`,
    birdPath: `${BIRD_PATH}/Swallow`,
    animalPath: `${BIRD_PATH}/AutumnBird`,
    texture: 'autumn'
  },
  {
    treePath: `${TREE_PATH}/WinterTree`,
    birdPath: `${BIRD_PATH}/SnowlyOwl`,
    animalPath: `${ANIMAL_PATH}/Penguin`,
    texture: 'winter'
  },
];