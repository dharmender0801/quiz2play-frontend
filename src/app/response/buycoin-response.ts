import { BuyCoinList } from "../models/buy-coin-list";
import { StatusDescription } from "../models/status-description";

export class BycoinResponse {
    statusDescription = new StatusDescription();
    buyCoinPackList: BuyCoinList[]| any=[]
}