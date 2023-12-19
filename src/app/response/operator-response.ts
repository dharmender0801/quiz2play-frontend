import { StatusDescription } from '../models/status-description';

export class OperatorRes {
    statusDescription = new StatusDescription();
    urlModel: UrlModel | any;
}

export class UrlModel {
    'id': number | any;
    'url': string | any;
    'msisdnLength': string | any;
    'serviceId': string | any;
    'status': string | any;
    'isPinVerify': boolean | any;
    'pinLength': number | any | string;
    'portalId': string | any;
}
