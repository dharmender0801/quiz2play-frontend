import { BuyLive } from "../models/buylive-resp";
import { Level } from "../models/level-model";
import { QuesAnsModel } from "../models/ques-Ans-model";
import { StatusDescription } from "../models/status-description";

export class QuesAnsResponse{
  statusDescription = new StatusDescription();
  queAnsList:QuesAnsModel | any
  level:Level | undefined;
  buyLive:BuyLive | any
}