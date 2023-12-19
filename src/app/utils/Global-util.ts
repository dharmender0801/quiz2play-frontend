import { Subject } from "rxjs";
import { LoginResponse } from "../models/loginresponse";
import { CatagoryResponse } from "../response/catagory-response";
import { PinVerResponse } from "../response/pin-verfy-request";
import { EncDecryptUtil } from "./EncDec-util";

export class GlobalUtil{
    user = new Subject<any>();
    loginResponse:PinVerResponse;
    categoryRes:CatagoryResponse | undefined;
    OneTime:boolean =false

    constructor(){
        let category= localStorage.getItem('catagoryres')
        if(category !=null){
            this.categoryRes = EncDecryptUtil.dec(category)
        }
        this.loginResponse = new PinVerResponse();
        this.categoryRes = new CatagoryResponse(); 
        
    }

   setUser(){
    let encryptInfo = localStorage.getItem('userdata');
    if(encryptInfo !=null){
        this.loginResponse=EncDecryptUtil.dec(encryptInfo);
        this.user.next(this.loginResponse)
    }
   }
    
}