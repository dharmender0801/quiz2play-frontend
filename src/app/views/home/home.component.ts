import { Component, OnInit } from '@angular/core';

import { ModalService } from 'src/app/_modal';
import { NgForm } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { HomepageService } from 'src/app/services/homepage.service';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { ToastrService } from 'ngx-toastr';
import * as _fromAction from '../../store/actions/index';
import * as _fromStore from '../../store/index';
import { Store } from '@ngrx/store';
import { DataShareService } from 'src/app/services/data-share.service';
import { ProfileModel } from 'src/app/models/profile-model';
import { CatagoryResponse } from 'src/app/response/catagory-response';
import { Catagory } from 'src/app/models/catagory-model';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { TranslateService } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  encryptInfo: string | null | any;
  public decryptedInfo: any;
  loginResponse: PinVerResponse | any;
  instances: any = [];
  registerForm: NgForm | undefined | any;
  pageloc: string = '';
  loginForm: NgForm | any;
  LoggedIn: boolean | any = false
  profile: ProfileModel | any;
  catagoryres: CatagoryResponse | any;
  defaultImage = "assets/images/loder-img-500px.gif";
  // catagoryList: any = [];
  newArray: any;
  userProfileId: string | undefined;
  userId: string | undefined;
  loggedIn: boolean = false
  ModalStatus: any;
  categoryList: Catagory[] | any = [];
  currentRoute: any;
  locale: string;




  constructor(public modalService: ModalService, public router: Router, public translate: TranslateService, private route: Router, private homeService: HomepageService, private toastr: ToastrService, private store: Store<_fromStore.MainPageState>, public dataShare: DataShareService) {
    this.encryptInfo = localStorage.getItem('userdata');

    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // console.log(event);
        // console.log(this.currentRoute)
      }

    });
    let locale = localStorage.getItem('locale');
    if (locale == null) {
      let language = 'en'
      localStorage.setItem('locale', language)
    }
    if (locale == 'ar') {
      this.locale = localStorage.getItem('locale')
    }
    if (this.encryptInfo != null) {
      this.loginResponse = EncDecryptUtil.dec(this.encryptInfo)
      this.LoggedIn = true;
      this.profile = this.loginResponse.subModel.quiz2PlayUserProfileModel[0]

    }
    this.pageloc = ''
    //  this.pageloc=this.dataShare.mainurl


  }


  ngOnInit(): void {
    this.catagoryres = new CatagoryResponse()
    this.fetchCatagories();
  }
  openModal(id: string) {
    this.modalService.open(id)
  }
  closeModal(id: string) {
    this.modalService.close(id)
  }
  fetchCatagories() {
    this.store.dispatch(new _fromAction.FetchCatagory());
    this.store.select<any>(_fromStore.fetchCatagoryResponse).subscribe(data => {
      if (data) {
        this.catagoryres = data;
        if (this.catagoryres.statusDescription.statusCode == 200) {
        }
      }
    })
  }
  onActivate($event) {
    let url: string = window.location.href;

    let routr = url;
    let index = routr.lastIndexOf('/')

    this.pageloc = routr.substr(index + 1, routr.length)
  }


  pageresolver(id: string) {
    this.dataShare.mainurl = this.pageloc
    this.pageloc = this.dataShare.mainurl
    if (id == 'catagories' || id == 'help' || id == 'buycoin') {
      this.dataShare.mainurl = id
      if (id == 'catagories') {
        this.route.navigate([''])
      }
      else {
        this.route.navigate([`${id}`])
      }

    }
    else if (id == 'myscore') {
      if (this.dataShare.loggedIn == true) {

        this.dataShare.mainurl = id;
        this.route.navigate([`${id}`])
      }
      else {
        this.modalService.open('loginmodal')

      }
    }
    this.pageloc = this.dataShare.mainurl
    //  this.pageloc=''
  }
  isVisible(value: any) {

    return eval(value);
  }
  CatagoryRouting(id: any) {
    if (this.encryptInfo == null) {

    }
    else {
      if (this.dataShare.loggedIn == true) {

        let catagoryId = id.id;

        catagoryId = encodeURIComponent(CryptoJS.AES.encrypt(JSON.stringify(catagoryId), '$AtplCms@98$9876').toString());
        localStorage.setItem('categoryId', catagoryId)
        this.route.navigate(['categories/level']);

      }
      else {
        // this.dataShare.fetchProducts()
        this.modalService.open('loginmodal');
        this.ModalStatus = true

      }
    }

  }


}
