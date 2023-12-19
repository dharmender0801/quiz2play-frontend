import { Banner } from "../models/banner-model";
import { StatusDescription } from "../models/status-description";

export class BannerRs{
    statusDescription = new StatusDescription();
    bannerList : Banner[] | any
}