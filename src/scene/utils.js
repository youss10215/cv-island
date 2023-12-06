
import { useEnvironment, useTexture } from "@react-three/drei";

import AutumnBird from "../models/animals/AutumnBird";
import Penguin from "../models/animals/Penguin";
import Seagulls from "../models/animals/Seagulls";
import Swallow from "../models/animals/Swallow";
import SnowlyOwl from "../models/animals/SnowlyOwl";
import AutumnTree from "../models/wild/trees/AutumnTree";
import PalmTree from "../models/wild/trees/PalmTree";
import PineTree from "../models/wild/trees/PineTree";
import WinterTree from "../models/wild/trees/WinterTree";
import Flowers from "../models/wild/Flowers";
import Rock from "../models/wild/Rock";
import Flamingo from "../models/animals/Flamingo";
import Monkey from "../models/animals/Monkey";

export const mapsElements = [
  {
    Tree: PalmTree,
    Bird: Seagulls,
    Rock: Monkey,
    texture: 'summer'
  }, {
    Tree: AutumnTree,
    Bird: Swallow,
    Rock: AutumnBird,
    texture: 'autumn'
  },
  {
    Tree: WinterTree,
    Bird: SnowlyOwl,
    Rock: Penguin,
    texture: 'winter'
  },
  {
    Tree: PineTree,
    Bird: Swallow,
    Rock: Flowers,
    texture: 'spring'
  },
];