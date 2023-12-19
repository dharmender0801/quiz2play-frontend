import { ProfileModel } from "../models/profile-model";
import { StatusDescription } from "../models/status-description";

export class Buyliveresponse{
    statusDescription = new StatusDescription();
    profileModel:ProfileModel | undefined
}