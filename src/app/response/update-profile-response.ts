import { StatusDescription } from "../models/status-description";
import { ProfileModel } from '../models/profile-model';

export class UpdateProfilRes{
    statusDescription = new StatusDescription();
    profileDetail : ProfileModel | any;
    
}