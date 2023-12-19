import { Level } from "../models/level-model";
import { QuesAnsModel } from "../models/ques-Ans-model";
import { ReRollModel } from "../models/reroll-model,";
import { StatusDescription } from "../models/status-description";

export class RerollResponse {

    statusDescription = new StatusDescription();
    queAnsList  = new QuesAnsModel() 
    quesAnsReroll = new QuesAnsModel();
    level:Level |any
}