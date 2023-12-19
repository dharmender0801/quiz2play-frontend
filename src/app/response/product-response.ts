import { ProductList } from "../models/product-list";
import { StatusDescription } from "../models/status-description";

export class ProductResponse{
    
    statusDescription = new StatusDescription()
    productList:ProductList[] |  any=[]
}