import { Component, Input, OnInit } from '@angular/core';
import { ProfileModel } from 'src/app/models/profile-model';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { environment } from 'src/environments/environment';
import * as CryptoJS from 'crypto-js';
import { DataShareService } from 'src/app/services/data-share.service';
import { TranslateService } from '@ngx-translate/core';
import { Router, RoutesRecognized } from '@angular/router';

@Component({
  selector: 'app-bar-comp',
  templateUrl: './bar-comp.component.html',
  styleUrls: ['./bar-comp.component.css']
})
export class BarCompComponent implements OnInit {
  // @Input()
  Star: any
  StarNone: boolean = false;
  encryptInfo: string | null
  loginResponse: PinVerResponse | any;
  profile: ProfileModel | any
  locale: string;

  constructor(public d: DataShareService, public translate: TranslateService, private router: Router) {
    this.loginResponse = new PinVerResponse();
    // this.profile= new ProfileModel()
    this.encryptInfo = localStorage.getItem('userdata');
    if (this.encryptInfo != null) {
      var deData = CryptoJS.AES.decrypt(decodeURIComponent(this.encryptInfo.toString()), environment.key);
      this.loginResponse = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
      this.locale = localStorage.getItem('locale')
      console.log(this.router.url)

    }

    // Object.assign(this.profile,this.loginResponse.subModel?.quiz2PlayUserProfileModel[0])

    if (this.encryptInfo == null) {
      this.profile = this.loginResponse.subModel?.quiz2PlayUserProfileModel[0]
      // this.heart =this.profile.live
      // this.coins = this.profile.coins;

    }
    this.showStar()
  }

  ngOnInit(): void {
    this.StarNone = this.Star
  }
  showStar() {
    console.log(this.router.url)
    if (this.router.url == '/categories/level') {
      this.Star = false;
    }
    else if (this.router.url == '/') {
      this.Star = false
    }
    else if (this.router.url === '/categories/ques') {
      this.Star = true
    }
    else {
      this.Star = false
    }
  }
}
