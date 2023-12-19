import { StatusDescription } from "../models/status-description";
import { ProductList } from '../models/product-list'

export class OperatorListPro {
    statusDescription = new StatusDescription();
    operatorList: OperatorRes | any = []
}



export class OperatorRes {
    "id": number | any;
    "country": string | any;
    "operator": string | any;
    "serviceId": string | any;
    "portalId": string | any;
    "language": string | any;
    "status": boolean | any;
    productList: ProductList | any
}

