import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { PinVerResponse } from '../response/pin-verfy-request';
import { EncDecryptUtil } from '../utils/EncDec-util';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{

  loginResponse: PinVerResponse;
  public encryptInfo;
  public decryptedInfo;

  constructor(private router: Router) {
      this.encryptInfo = localStorage.getItem('userdata');
     this.loginResponse=EncDecryptUtil.dec(this.encryptInfo)
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

      if(this.loginResponse!=null){
          const token = this.loginResponse.userModel.userTokenDetails[0].jwtToken;
  
          if (token) {
              // this.router.navigate(['dashboard']);
              return true;
          } else {   
              this.router.navigate(['']);
              return false
          }
      }else{
          this.router.navigate(['']);
          return false
      }
      
  }
}
