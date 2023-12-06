
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

export const mapsElements = [
  {
    SeasonTree: PalmTree,
    Bird: Seagulls,
    Rock: Rock
  }, {
    SeasonTree: AutumnTree,
    Bird: Swallow,
    Rock: AutumnBird
  },
  {
    SeasonTree: WinterTree,
    Bird: SnowlyOwl,
    Rock: Penguin
  },
  {
    SeasonTree: PineTree,
    Bird: Swallow,
    Rock: Flowers
  },
];