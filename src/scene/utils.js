
import PineTree from "../models/PineTree";
import AutumnTree from "../models/AutumnTree";
import WinterTree from "../models/WinterTree";
import Seagulls from "../models/Seagulls";
import AutumnBird from "../models/AutumnBird";
import Rock from "../models/Rock";
import Penguin from "../models/Penguin";
import Flowers from "../models/Flowers";
import PalmTree from "../models/PalmTree";


export const mapsElements = [
  {
    SeasonTree: PalmTree,
    Bird: Seagulls,
    Rock: Rock
  },
  {
    SeasonTree: AutumnTree,
    Bird: Seagulls,
    Rock: AutumnBird
  },
  {
    SeasonTree: WinterTree,
    Bird: Seagulls,
    Rock: Penguin
  },
  {
    SeasonTree: PineTree,
    Bird: Seagulls,
    Rock: Flowers
  },
];