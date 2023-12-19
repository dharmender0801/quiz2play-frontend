import { ProfileImageModel } from "../models/profile-image-model";
import { StatusDescription } from "../models/status-description";

export class ProfileImageResponse {
   statusDescription = new StatusDescription();
   userProfileImageList  : ProfileImageModel[] | any=[]
}