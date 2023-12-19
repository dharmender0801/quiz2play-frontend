import { UserTokenDetail } from "./user-token-model";

export class UserDetail{

        id: number | any;
        msisdn:string | any ;
        uniqueId:string | any ;
        regDate:    string |any ;
        webRegDate: null | any;
        activeStatus:      string |any ;
        language:      string |any ;
        loginStatus:  any | null;
        lastLoginDate: string |any ;
        lastLogoutDate: null    | any;
        updateDate: null   | any;
        appOs: null   | any;
        appOsVersion: null   | any;
        emailId: null   | any;
        deviceMarketingName: null   | any;
        deviceModelName: null   | any;
        webFlag: null   | any;
        appFlag: null   | any;
        fcmToken: null   | any;
        notificationFlag: null   | any;
        name: null   | any;
        profileImage: null   | any;
        appVersion: null   | any;
        channel:       string |any ;
        source:       string |any ;
        metadataStatus: null   | any;
       userTokenDetails:UserTokenDetail[] | any;


}