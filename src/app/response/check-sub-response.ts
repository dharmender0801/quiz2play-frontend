import { StatusDescription } from "../models/status-description";
import { UserSubModel } from "../models/user-submodel";

export class CheckSubResponse{
    statusDescription = new StatusDescription();
    subDetail  = new UserSubModel()
}