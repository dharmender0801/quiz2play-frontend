import { StatusDescription } from "../models/status-description";

export class Pingenresp{
    statusDescription = new StatusDescription();
    msisdn: number | any;
    transactionId: number |any;
}