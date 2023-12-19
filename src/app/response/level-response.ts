import { Catagory } from "../models/catagory-model";
import { GuidelineList } from "../models/guidelineList-model";
import { Level } from "../models/level-model";
import { StatusDescription } from "../models/status-description";

export class LevelResponse{
    statusDescription = new StatusDescription();
    levelList: Level[]| any=[];
     category :  Catagory[] |  any;
     guideLineList: GuidelineList[] | any[] 

}