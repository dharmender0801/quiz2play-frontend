import { environment } from "src/environments/environment";
import * as CryptoJS from 'crypto-js'
import { DataShareService } from "../services/data-share.service";

export class EncDecryptUtil{

    public static Enc(data:any,storageKey:string){
        let Item= encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(data), environment.key).toString());
        if(storageKey != ""){
            localStorage.setItem(storageKey,Item);
        }
      return Item;
    }

     public static dec(encryptInfo:string){
        if (encryptInfo != null) {
          var deData = CryptoJS.AES.decrypt(decodeURIComponent(encryptInfo.toString()), environment.key);
             var  data =  JSON.parse(deData.toString(CryptoJS.enc.Utf8));
     
        }
      
      return data
     }

     public static logout(){
       localStorage.clear();
       window.location.href="";
 
     }
}