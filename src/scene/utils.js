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
import Crab from "../models/animals/Crab";

export const mapsElements = [
  {
    Tree: PalmTree,
    Bird: Seagulls,
    Animal: Crab,
    texture: 'summer'
  }, {
    Tree: AutumnTree,
    Bird: Swallow,
    Animal: AutumnBird,
    texture: 'autumn'
  },
  {
    Tree: WinterTree,
    Bird: SnowlyOwl,
    Animal: Penguin,
    texture: 'winter'
  },
  {
    Tree: PineTree,
    Bird: Swallow,
    Animal: Flowers,
    texture: 'spring'
  },
];