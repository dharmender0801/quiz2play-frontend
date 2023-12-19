import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HomepageService } from 'src/app/services/homepage.service';
import { ModalService } from 'src/app/_modal';
import * as _fromAction from "../../store/actions/index";
import * as _fromStore from "../../store/index"
import { Store } from '@ngrx/store';
import { BycoinResponse } from 'src/app/response/buycoin-response';
import { buyCoinListresponse } from 'src/app/store/reducers/mainPage.reducer';
import { BuyCoinList } from 'src/app/models/buy-coin-list';
import { DataShareService } from 'src/app/services/data-share.service';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { ProfileImageModel } from 'src/app/models/profile-image-model';
import { ProfileModel } from 'src/app/models/profile-model';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { ToastrService } from 'ngx-toastr';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';

@Component({
  selector: 'app-buycoins',
  templateUrl: './buycoins.component.html',
  styleUrls: ['./buycoins.component.css']
})
export class BuycoinsComponent implements OnInit {
  buyForm:NgForm | any;
  buyCoinlist:BycoinResponse | any ;
  selected :BuyCoinList | any;
  encryptInfo: string | null;
  loginResponse : PinVerResponse | any ;
  profile  :ProfileModel | any;
  url = environment.url
  
  constructor(public modal:ModalService,public home :HomepageService,private http:HttpClient,private store:Store<_fromStore.MainPageState>,public data:DataShareService,public toastr:ToastrService) {
    this.loginResponse = new PinVerResponse();
    // this.profile = new ProfileModel()
    this.encryptInfo = localStorage.getItem('userdata');
   if(this.encryptInfo != null){
    this.loginResponse = EncDecryptUtil.dec(this.encryptInfo)
    this.profile = this.loginResponse?.subModel.quiz2PlayUserProfileModel[0];
   }
  //  this.scrollToTop()

   }

  ngOnInit(): void {
    this.buyCoinlist = new BycoinResponse()
    this.selected = new BuyCoinList();
    this.getlist();

  }
  scrollToTop(){
   this.ngOnInit()
  }
  openModal(id:string){
  this.modal.open(id)
  }
  closeModal(id:string){
  this.modal.close(id)
  }
  close(){
    this.modal.close("buycoins")
  }
   getlist(){
  if(this.encryptInfo ==null){
    this.store.dispatch( new _fromAction.buycoins());
    this.store.select<any>(_fromStore.buycoinResponse).subscribe((data:any)=>{
      if(data){
        this.buyCoinlist =data;
 
      }
    })
  }
  else{
    this.store.dispatch( new _fromAction.buyCoinslogin());
    this.store.select<any>(_fromStore.buycoinResponse).subscribe((data:any)=>{
      if(data){
        this.buyCoinlist =data;
 
      }
    })
  }

    
   }
   buycoin(){
  this.data.coins = this.data.coins +  this.selected.coins;
  this.modal.close('buycoins');
  this.profile.coins = this.data.coins;
  // this.home.updateProfile(this.profile)
  this.http.post(`${this.url}/profile/v1/update`,this.profile).subscribe((data:any)=>{
    if(data){
      if(data.statusDescription.statusCode ==200){
        this.toastr.success("Purchase Successfull ");
        this.loginResponse?.subModel.quiz2PlayUserProfileModel.pop();
        this.loginResponse?.subModel.quiz2PlayUserProfileModel.push( this.profile)
        this.encryptInfo = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(this.loginResponse), environment.key).toString());
          localStorage.setItem('userdata', this.encryptInfo);
      }
      else{
        this.toastr.error(data.statusDescription.description)
      }
    }
  })
  // this.data.UpdateProfile(this.profile)
 
   }
  getcoins(data:any){
    if(this.encryptInfo ==null){
      this.modal.open("loginmodal")
    }
    else{
      this.selected =data
      this.modal.open('buycoins')
    }

  }
}
