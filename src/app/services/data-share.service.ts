import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { PinVerResponse } from '../response/pin-verfy-request';
import { environment } from 'src/environments/environment';
import { Catagory } from '../models/catagory-model';
import { Level } from '../models/level-model';
import { ProfileModel } from '../models/profile-model';
import { HomepageService } from './homepage.service';
import { ProfileImageResponse } from '../response/profile-Image-response';
import { ProfileImageModel } from '../models/profile-image-model';
import { Store } from '@ngrx/store';
import * as _fromStore from '../store/index';
import * as _fromAction from '../store/actions/index'
import { ProductResponse } from '../response/product-response';
import { EncDecryptUtil } from '../utils/EncDec-util';
import { UpdateProfilRes } from '../response/update-profile-response';
import { CatagoryResponse } from '../response/catagory-response';
import { ModalService } from '../_modal';
import { Buyliveresponse } from '../response/buylive-response';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class DataShareService {
  public LoggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public encryptInfo: string | any;
  loginResponse: PinVerResponse | any;
  public lives: number | any;
  public coins: number | any;
  public loggedIn: boolean = false;
  productId: string | any
  subId: number | any
  userProfileId: number | any
  userId: number | any;
  catagoryres: Catagory | any;
  levelres: Level | any
  routeUrl: string | boolean
  name: string | any;
  QuesObj: boolean = false

  profileimage: ProfileImageModel[] | any;
  profile: ProfileModel | any;
  imageRes: ProfileImageResponse | any;
  productRes: ProductResponse | any;
  public onetime: boolean = false;
  profileRes: UpdateProfilRes;
  categoryRes: CatagoryResponse | undefined;
  mainurl: string = "catagories";
  firstTime: boolean = false;
  countdown: number | number
  OneTime: boolean = false;
  questionStars: number | any = 0
  reinitialiseTimer: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  buyliveRes: Buyliveresponse | any;
  levelTimer: string | any;
  timerStatus: boolean | any;
  questionurl: string | any;
  url: string | any



  constructor(public home: HomepageService, private store: Store<_fromStore.MainPageState>, private modal: ModalService, public toastr: ToastrService, private route: Router, private http: HttpClient) {
    this.url = environment.url;
    this.loginResponse = new PinVerResponse();
    this.productRes = new ProductResponse();
    this.imageRes = new ProfileImageResponse();
    this.profileRes = new UpdateProfilRes();
    this.categoryRes = new CatagoryResponse();

    // this.profileImagelist()
    this.encryptInfo = localStorage.getItem('userdata');

    if (this.encryptInfo != null) {
      var DeData = CryptoJS.AES.decrypt(decodeURIComponent(this.encryptInfo.toString()), environment.key);
      this.loginResponse = JSON.parse(DeData.toString(CryptoJS.enc.Utf8));
      this.LoggedIn.next(true);
      this.lives = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].live;
      this.coins = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].coins
      this.userId = this.loginResponse.userModel.id;
      this.userProfileId = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id;
      this.subId = this.loginResponse.subModel.id;
      this.profile = this.loginResponse.subModel.quiz2PlayUserProfileModel[0];
      this.loggedIn = true;;
      this.profileImagelist()
      // this.questionStars = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].star
    }
    else {
      this.LoggedIn.next(false);
      this.lives = 3;
      this.coins = 100;
      this.loggedIn = false
    }

  }

  profileImagelist() {

    this.store.dispatch(new _fromAction.profileImage());
    this.store.select(_fromStore.profileImgResponse).subscribe((data: any) => {
      if (data) {

        this.imageRes = data
        if (this.imageRes.statusDescription.statusCode == 200) {

          this.imageRes.userProfileImageList.forEach(element => {
            // this.imagesList.push(element);
          });
        }
      };

    })
  }
  liveremover() {
    this.lives = this.lives - 1
  }
  Setlogin() {
    this.LoggedIn.next(true)
  }
  UpdateProfile(profile: any) {
    profile.live = this.lives;
    profile.coins = this.coins
    profile = { ...profile, language: localStorage.getItem('locale') }
    this.http.post(`${this.url}/profile/v1/update`, profile).subscribe((data: any) => {
      if (data) {
        this.profileRes = new UpdateProfilRes();
        this.profileRes = data
        if (this.profileRes.statusDescription.statusCode == 200) {
          // this.lives = this.profileRes.profileDetail.live;
          this.coins = this.profileRes.profileDetail.coins
          this.loginResponse.subModel.quiz2PlayUserProfileModel.pop();
          this.loginResponse.subModel.quiz2PlayUserProfileModel.push(this.profileRes.profileDetail);
          EncDecryptUtil.Enc(this.loginResponse, 'userdata')
        }
      }
    })

  }
  islogin() {
    if (this.loggedIn == true) {
      return true
    }
    else {
      return false
    }
  }

  Nolive() {
    this.modal.open('nolive');
    this.timerStatus = true
  }

}
