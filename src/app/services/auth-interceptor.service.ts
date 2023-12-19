import { HttpInterceptor ,HttpEvent,HttpHandler,HttpRequest} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { PinVerResponse } from '../response/pin-verfy-request';
import * as CryptoJS from 'crypto-js'; 
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor{
  encryptInfo :number  | undefined | string =""  ;
  loginResponse :PinVerResponse | any;

  constructor(public router:Router) { }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
    if (localStorage.getItem('userdata') != null ) {
          
      this.encryptInfo = <string>localStorage.getItem('userdata');
      var deData= CryptoJS.AES.decrypt(decodeURIComponent(this.encryptInfo.toString()), '$AtplCms@98$9876'); 
      this.loginResponse = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
      const token = this.loginResponse.userModel.userTokenDetails[0].jwtToken;
      if (!token) {
          this.router.navigate(['']);
        
          
      }
      const req1 = req.clone({
          headers: req.headers.set('Authorization', `${token}`)
          .set('userId',""+this.loginResponse.userModel.id).set('Cache-Control', 'no-cache, no-store, must-revalidate').set('language',localStorage.getItem("locale") )
          .set('Pragma', 'no-cache')
          .set('If-Modified-Since', '0')
      });
      return next.handle(req1);
  } else {
    const req2 = req.clone({
      headers: req.headers.set('language',localStorage.getItem("locale") )
     
  });
      return next.handle(req2);

  }
      }
}
