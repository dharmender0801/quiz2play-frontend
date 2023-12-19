import { Level } from "../models/level-model";
import { ScoreList } from "../models/score-list-model";
import { StatusDescription } from "../models/status-description";

export class Scoreresponse {
    statusDescription = new StatusDescription();
    userScoreList: ScoreList[] | any=[];
    playLevel:Level | undefined

}