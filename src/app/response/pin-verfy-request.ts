import { ProfileModel } from "../models/profile-model";
import { StatusDescription } from "../models/status-description"
import { UserDetail } from "../models/user-model"
import { UserSubModel } from "../models/user-submodel";

export class PinVerResponse{
    statusDescription = new StatusDescription()
    userModel: UserDetail | any;
    subModel:UserSubModel | any
    
  
}