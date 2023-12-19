import { RankingList } from "../models/ranking-list-model";
import { StatusDescription } from "../models/status-description";

export class RankingRes{
    statusDescription = new StatusDescription();
    rankingUserList:RankingList[] | any
}