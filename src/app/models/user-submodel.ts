import { ProfileModel } from "./profile-model";

export class  UserSubModel{

        id:     number | any;
        userId:    number | any;
        msisdn:    number | any;
        productId:            number | any;
        productName: string | any;
        subscriptionDate:string | any;
        chargeDate: null |any;
        expiryDate: null | any;
        unsubDate: null | any;
        activeStatus: number | any;
        amount:    string | any;
        price:   string | any;
        chargeAmount: null |any;
        channel: string | any;
        productType: string | any;
        mappedItemtypeId:   string | any;
        meta1: null | any;
        meta2: null | any;
        meta3: null | any;
        keyword: null | any;
        graceDate: null | any;
        validity:   number | any;
        operatorResponse: null | any;
        advId: null | any;
        transactionId: null | any;
        partnerTransactionId: null | any;
        serviceId:               number | any;
        serviceName: null | any
        quiz2PlayUserProfileModel:ProfileModel[]  | any = []
}