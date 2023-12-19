import { Catagory } from "../models/catagory-model";
import { StatusDescription } from "../models/status-description";

export class CatagoryResponse{
    statusDescription:StatusDescription | any;
    categoryList :Catagory[] =[]
}