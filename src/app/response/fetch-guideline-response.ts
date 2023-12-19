import { GuidelineList } from "../models/guidelineList-model";
import { StatusDescription } from "../models/status-description";

export class fetchGuidelineResponse{
    statusDescription = new StatusDescription();
    guideLineList: GuidelineList[] | any 

}