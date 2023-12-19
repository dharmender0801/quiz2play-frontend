import { Component, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Store } from '@ngrx/store';
import * as _fromAction from '../../../store/actions';
import * as _fromStore from '../../../store';
import { ModalService } from 'src/app/_modal';
import { ProductResponse } from 'src/app/response/product-response';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { environment } from 'src/environments/environment';
import { DataShareService } from 'src/app/services/data-share.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { ProfileModel } from 'src/app/models/profile-model';
import { StatusDescription } from 'src/app/models/status-description';
import { UpdateProfilRes } from 'src/app/response/update-profile-response';
import { PinRequest } from 'src/app/request/new-pin-request';
import { Pingenresp } from 'src/app/response/pin-gen-response';
import { PinVerRequest } from 'src/app/request/pin-verify-request';
import { CheckSubResponse } from 'src/app/response/check-sub-response';
import { ProfileImageResponse } from 'src/app/response/profile-Image-response';
import { LogoutResponse } from 'src/app/response/logout-response';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';

import { GlobalUtil } from 'src/app/utils/Global-util';
import { TranslateService } from '@ngx-translate/core';
import { LangResponse } from 'src/app/response/lang-response';
import { HttpClient } from '@angular/common/http';
import { OperatorRes } from 'src/app/response/operator-response';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { OperatorListPro } from 'src/app/response/operListResponse';
import { HomepageService } from 'src/app/services/homepage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() Navigation: boolean | any;
  // @ViewChild('ProfileModal') public ProfileModal:ModalDirective
  defaultImage = 'assets/images/loder-img-500px.gif';
  loggedIn: boolean = false;
  ProductList: any = [];
  loginResponse: PinVerResponse | any;
  encryptInfo: string | any;
  editForm: NgForm | any;
  submitted: boolean = false;
  profile: ProfileModel | any;
  profileimage: string = '';
  unsubForm: NgForm | any;
  logoutResponse: LogoutResponse | any;
  unsubRes: StatusDescription | any;
  userProfileId: any;
  userId: any;
  Name: any | string;
  updateRes: UpdateProfilRes | any;
  showAge: boolean | any = false;
  showName: boolean | any = false;
  profileImageRes: ProfileImageResponse | undefined;
  registerForm: NgForm | undefined | any;
  loginForm: NgForm | any;
  otpbool: number = 0;
  otpvalue: string = '';
  otpForm: NgForm | any;
  loginbool: number = 0;
  registermsisdn: number | any;
  loginSubmit: boolean = false;
  pinreq: PinRequest | any;
  pinres: Pingenresp | any;
  pinverfy: PinVerRequest | any;
  pinverfres: PinVerResponse | any;
  LoggedIn: boolean | any = false;
  checkSubsRes: CheckSubResponse | any;
  subStatus: boolean | undefined;
  serviceId: number | any;
  @ViewChild('')
  portalId: number | any;
  loginSubStatus: boolean | any;
  loginpin: PinRequest | any;
  loginMsisdn: number | any = null;
  loginpinres: Pingenresp | any;
  showPacks: boolean | undefined;
  packShow: boolean | undefined = false;
  Age: any;
  cuteye: boolean = false;
  updateform: NgForm | any;
  subresend: boolean | any = false;
  loginresend: boolean | any = false;
  status: boolean | undefined = true;
  loginProd: any;
  profileImage: any;
  gender: any;
  operatorResProd: OperatorListPro | any;
  operatorId: any;
  imagesList: ProfileImageResponse | undefined;
  msisdn: any;
  fistlogin: boolean | any;
  showNavbar: boolean = false;
  global = new GlobalUtil();
  searchHide: boolean = false;
  language: string = 'English';
  langRes: LangResponse | undefined;
  Modal_open: boolean;
  countryCode: string;
  url: string = environment.url;
  operatorRes: OperatorRes | any;
  currentRoute: any;
  langhide: boolean = false;
  locale: string | any;

  constructor(
    public router: Router,
    public modalService: ModalService,
    private routeway: ActivatedRoute,
    public translate: TranslateService,
    private http: HttpClient,
    public store: Store<_fromStore.MainPageState>,
    public dataShare: DataShareService,
    private toastr: ToastrService,
    public loginStatus: Store<_fromStore.PinverifyStatus>,
    public route: Router,
    private home: HomepageService
  ) {
    this.loginResponse = new PinVerResponse();
    this.serviceId = environment.serviceId;
    this.portalId = environment.portalId;
    this.countryCode = environment.code;
    let value = localStorage.getItem('login');
    if (value != null) {
      this.fistlogin = value;
      this.Modal_open = true;
      localStorage.removeItem('login');
    }
    router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        // console.log(event);
        // console.log(this.currentRoute)
      }
    });
    const filter = this.routeway.snapshot.queryParamMap.get('lang');
    const msisdn = this.routeway.snapshot.queryParamMap.get('msisdn');
    console.log(msisdn);
    console.log(filter);
    if (filter != null) {
      localStorage.setItem('locale', filter);
    }
    if (msisdn) {
      let productId = this.routeway.snapshot.queryParamMap.get('productId');
      console.log(productId);
      if (productId != null) {
        this.loginProd = productId;
        // this.pinreq.productId = productId
      }
      this.CheckloginSub(msisdn, 'login');
    }

    this.url = environment.url;
    // console.log(this.url)
    let locale = localStorage.getItem('locale');
    console.log(localStorage.getItem('locale'));
    if (locale == null) {
      localStorage.setItem('locale', 'en');
      this.refresh('en');
      this.changeLang('en');
      console.log(localStorage.getItem('locale'));
    }
    if (locale != null) {
      if (locale == 'fr') {
        this.language = 'French';
        this.locale = 'fr';
      } else if (locale == 'en') {
        this.language = 'English';
        this.locale = 'en';
      } else if (locale == 'ar') {
        this.language = 'عربي';
        this.locale = 'ar';
      }
    }

    this.encryptInfo = localStorage.getItem('userdata');
    if (this.encryptInfo != null) {
      this.loginResponse = EncDecryptUtil.dec(this.encryptInfo);
      this.profile = this.loginResponse?.subModel.quiz2PlayUserProfileModel[0];
      this.profileImage = this.profile.profileImage;
      this.dataShare.name =
        this.loginResponse?.subModel.quiz2PlayUserProfileModel[0].name;
      this.userProfileId =
        this.loginResponse?.subModel.quiz2PlayUserProfileModel[0].id;
      this.userId = this.loginResponse?.userModel.id;
      this.msisdn = this.profile.msisdn;

      // this.countryCode = environment.code
      let url: string = window.location.href;

      let routr = url;
      let index = routr.lastIndexOf('/');

      let routerloc: any = routr.substr(index + 1, routr.length);
      // console.log(typeof this.currentRoute)
      // console.log(typeof routerloc)
      if (routerloc == 'ques') {
        this.searchHide = true;
        this.langhide = true;
      } else if (routerloc == 'level') {
        // this.searchHide = true;
        this.langhide = true;
      }

      // else if (this.currentRoute == '/') {
      //   this.langhide = false
      // }
      // else if (this.currentRoute == '/myscore') {
      //   console.log("route is ", routerloc)
      //   this.langhide = false
      // }
      // else if (this.currentRoute == '/help') {
      //   this.langhide = false
      // }
      // else if (this.currentRoute != '/buycoin') {
      //   this.langhide = false
      // }
    }

    translate.addLangs(['en', 'fr', 'ar']);
    if (localStorage.getItem('locale')) {
      const browserLang = localStorage.getItem('locale');
      translate.use(browserLang.match(/en|fr|ar/) ? browserLang : 'en');
    } else {
      localStorage.setItem('locale', 'en');
      translate.setDefaultLang('en');
    }
  }
  ngOnDestroy(): void {
    this.pinreq = new PinRequest();
    this.loginpin = new PinRequest();
    this.updateRes = new UpdateProfilRes();
    this.pinverfy = new PinVerResponse();
    this.checkSubsRes = new CheckSubResponse();
    this.loginpinres = new Pingenresp();
    this.pinres = new Pingenresp();
  }
  ngOnInit(): void {
    // this.ProductList = new ProductResponse();
    this.dataShare.LoggedIn.subscribe((data: any) => {
      if (data == true) {
        this.loggedIn = true;
      } else {
        this.loggedIn = false;
      }
    });
    this.showNavbar = false;
    this.pinreq = new PinRequest();
    this.loginpin = new PinRequest();
    this.pinres = new Pingenresp();
    this.langRes = new LangResponse();
    this.updateRes = new UpdateProfilRes();
    this.pinverfy = new PinVerResponse();
    this.checkSubsRes = new CheckSubResponse();
    this.loginpinres = new Pingenresp();
    this.profileImageRes = new ProfileImageResponse();
    if (!this.dataShare.loggedIn && this.dataShare.OneTime == false) {
      this.fetchOperatorList();
      this.fetchProducts();
      let formdata = {
        protalId: this.portalId,
        serviceId: this.serviceId,
      };
      this.store.dispatch(new _fromAction.fetchoperatorprop(formdata));
      this.store
        .select<any>(_fromStore.fetchOperatorPropResponse)
        .subscribe((data) => {
          if (data) {
            this.operatorRes = data;
          }
        });
      this.dataShare.OneTime = true;
    }

    this.fetchLanguages();

    this.fetchOperator();

    this.profileModalQues();
  }
  fetchOperatorList() {
    this.home.fetchOperator().subscribe((data) => {
      if (data) {
        this.operatorResProd = data;
      }
    });
  }
  getloginOp(event, data: any) {
    this.operatorId = data.id;
    this.operatorResProd.operatorList.forEach((element: any) => {
      if (element.id == data.id) {
        this.ProductList = data.productList;
      }
    });
    this.loginProd = this.ProductList[0].id;
  }
  getOp(event: any, data: any) {
    this.operatorId = data.id;
    this.operatorResProd.operatorList.forEach((element: any) => {
      if (element.id == data.id) {
        this.ProductList = data.productList;
      }
    });
    this.pinreq.productId = this.ProductList[0].id;
    // this.ProductList = this.operatorResProd.operator.productList;
  }
  fetchOperator() {
    if (!this.dataShare.loggedIn && this.dataShare.OneTime == false) {
      this.fetchProducts();
      // console.log("Code  executed")

      let formdata = {
        protalId: this.portalId,
        serviceId: this.serviceId,
      };
      this.store.dispatch(new _fromAction.fetchoperatorprop(formdata));
      this.store
        .select<any>(_fromStore.fetchOperatorPropResponse)
        .subscribe((data) => {
          if (data) {
            this.operatorRes = data;
          }
        });
      this.dataShare.OneTime = true;
    }
  }

  fetchLanguages() {
    this.store.dispatch(new _fromAction.fetchLanguage());
    this.store
      .select<any>(_fromStore.fetchLangResponse)
      .subscribe((data: any) => {
        if (data) {
          this.langRes = data;
          console.log(this.langRes);
        }
      });
  }
  showNav() {
    this.showNavbar = !this.showNavbar;
  }
  StartQuiz() {
    //  localStorage.removeItem('login')
    this.fistlogin = false;
    this.modalService.close('startquiz');
    this.Modal_open = false;
    let catagoryId = this.dataShare.categoryRes.categoryList[0]?.id;

    EncDecryptUtil.Enc(catagoryId, 'categoryId');
    this.route.navigate(['categories/level']);
  }
  loginModal() {
    this.fetchProducts();
    this.modalService.open('loginmodal');
    this.ProductList = this.operatorResProd.operatorList[0].productList;
    this.operatorId = this.operatorResProd.operatorList[0].id;
    this.ProductList = this.operatorResProd.operatorList[0].productList;
    this.loginProd = this.ProductList[0].id;

    // this.loginProd = this.ProductList?.productList[0].id;
  }
  search() {
    this.route.navigate(['search']);
  }
  refresh(language: string) {
    // debugger

    localStorage.setItem('locale', language);
    this.translate.use(language);
    location.reload();
  }

  changeLang(language: string) {
    localStorage.setItem('locale', language);
    this.translate.use(language);
  }
  OnClick(data: any) {
    this.subsmodal();
  }
  subsmodal() {
    this.fetchProducts();
    this.modalService.open('subsid');
    this.operatorId = this.operatorResProd?.operatorList[0].id;
    this.pinreq.productId = this.operatorResProd?.operatorList[0].productList[0].id;
    this.ProductList = this.operatorResProd?.operatorList[0].productList;
  }
  fetchProducts() {
    // let formdata = {
    //   serviceId: environment.serviceId,
    //   portalId: environment.portalId,
    //   language: localStorage.getItem('locale'),
    // };
    // this.store.dispatch(new _fromAction.FetchProd(formdata));
    // this.store
    //   .select<ProductResponse>(_fromStore.fetchProductResponse)
    //   .subscribe((data: any) => {
    //     if (data) {
    //       this.ProductList = data;
    //       if (this.ProductList?.statusDescription.statusCode == 200) {
    //         this.dataShare.productId = this.ProductList?.productList[0].id;
    //       }
    //     }
    //   });
  }
  openModal(id: string) {
    this.modalService.open(id);
  }
  closeModal(id: string) {
    this.modalService.close(id);
    if (this.fistlogin) {
      this.fistlogin = false;
    }
    localStorage.removeItem('login');
    this.fistlogin = false;
    this.modalService.close('startquiz');
    this.Modal_open = false;
  }
  Navigate() {
    if (this.Navigation == true) {
      this.route.navigate(['/']);
    } else {
      return;
    }
  }

  //Close Modal
  close() {
    this.otpbool = 0;
    this.closeModal('subsid');
    this.registermsisdn = '';
    this.submitted = false;
    this.otpvalue = '';
    this.cuteye = false;
  }

  logout() {
    let formdata = {
      userProfileId:
        this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id,
      userId: this.loginResponse.userModel.id,
      language: localStorage.getItem('locale'),
    };

    this.store.dispatch(new _fromAction.logout(formdata));
    this.store
      .select<LogoutResponse>(_fromStore.logoutResponse)
      .subscribe((data: any) => {
        if (data) {
          this.logoutResponse = data;
          this.closeModal('logout');
          if (this.logoutResponse.statusDescription.statusCode == 200) {
            localStorage.clear();
            this.toastr.success(
              this.logoutResponse.statusDescription.description
            );
            window.location.href = '';
            this.dataShare.LoggedIn.next(false);
          } else {
            this.toastr.error(
              this.logoutResponse.statusDescription.description
            );
          }
        }
      });
  }
  unsub() {
    let formdata = {
      subscriptionId: this.loginResponse.subModel.id,
      userProfileId:
        this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id,
      userId: this.loginResponse.userModel.id,
      msisdn: this.loginResponse.userModel.msisdn,
      portalId: environment.portalId,
    };
    this.store.dispatch(new _fromAction.unSub(formdata));
    this.store.select<any>(_fromStore.unsubResponse).subscribe((data: any) => {
      if (data) {
        this.unsubRes = data;
        this.modalService.close('unsub');
        if (this.unsubRes.statusDescription.statusCode == 200) {
          localStorage.clear();
          // this.toastr.success(this.unsubRes.statusDescription.description)
          window.location.href = '';
          this.dataShare.LoggedIn.next(false);
        } else {
          this.modalService.close('unsub');
          this.toastr.error(this.unsubRes.statusDescription.description);
        }
      }
    });
  }
  resetFo(form: NgForm) {
    form.resetForm();
    this.modalService.close('subsid');
  }
  profileModalQues() {
    let dataObj = Boolean(localStorage.getItem('openProfile'));
    if (dataObj) {
      setTimeout(() => {
        this.profileModal();
        localStorage.removeItem('openProfile');
      }, 1000);
    }
  }

  PinGenregister(data: any) {
    let prepend = environment.code;
    prepend.toString();
    let msisdn = String(prepend) + String(this.registermsisdn);
    let formdata = {
      msisdn: msisdn,
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      productId: this.pinreq.productId,
    };
    if (data == true) {
      formdata.productId = this.checkSubsRes?.subDetail.productId;
      this.fistlogin = false;
    } else {
      formdata.productId = this.pinreq.productId;
      this.fistlogin = true;
      localStorage.setItem('login', this.fistlogin);
    }
    this.store.dispatch(new _fromAction.Pingen(formdata));
    this.store.select<any>(_fromStore.pingenResponse).subscribe((data) => {
      if (data) {
        this.pinres = data;
        if (this.pinres.statusDescription.statusCode == 200) {
          window.location.href = data.transactionId;
          // this.otpbool = 1;
        }
      }
    });
  }
  login(form: NgForm) {
    // this.loginProd = this.ProductList?.productList[0].id;
    this.loginSubmit = true;
    if (form.invalid) {
      return;
    }
    let prepend = environment.code;
    prepend.toString();
    let msisdn = String(prepend) + String(this.loginMsisdn);
    this.CheckloginSub(Number(msisdn), 'login');
    if (
      this.checkSubsRes.statusDescription.statusCode == 205 &&
      this.packShow == true
    ) {
      this.loginPinGen(false);
    }
    // else if (this.checkSubsRes.statusDescription.statusCode == 200) {
    //   this.loginbool = 1;
    // }
    // else{
    //   this.loginbool=1
    // }
  }

  CheckNewSub(num: any) {
    let formdata = {
      msisdn: num,
      serviceId: environment.serviceId,
    };
    this.store.dispatch(new _fromAction.CheckSubs(formdata));
    this.store.select<any>(_fromStore.checkSubResponse).subscribe((data) => {
      if (data) {
        this.checkSubsRes = data;
        if (this.checkSubsRes.statusDescription.statusCode == 200) {
          this.loginResponse = this.checkSubsRes;
          // this.otpbool = 1;
          // this.subStatus = true;
          // this.PinGenregister(true)
          this.modalService.close('subsid');
          this.setData();
        } else {
          this.subStatus = false;
          this.PinGenregister(false);
        }
      }
    });
  }

  updateProfile(form: any) {
    if (form.invalid) {
      this.toastr.error('Please Fill all Fields');
      return;
    }
    let formdata = {
      id: this.profile.id,
      name: this.Name,
      gender: this.gender,
      age: this.Age,
      msisdn: this.msisdn,
      live: this.profile.live,
      coins: this.profile.coins,
      country: this.profile.country,
      profileImage: this.profileImage,
      loginDateTime: this.profile.loginDateTime,
      logoutDateTime: this.profile.logoutDateTime,
      subscriptionId: this.loginResponse.subModel.id,
      language: localStorage.getItem('locale'),
    };
    this.store.dispatch(new _fromAction.UpdateProfile(formdata));
    this.store
      .select<any>(_fromStore.UpdateProfileResponse)
      .subscribe((data: any) => {
        if (data) {
          this.updateRes = data;
          if (this.updateRes.statusDescription.statusCode == 200) {
            this.toastr.success(this.updateRes.statusDescription.description);
            this.modalService.close('profile');
            this.showName = false;
            this.showAge = false;
            this.dataShare.name = this.updateRes.profileDetail.name;
            this.profile.name = this.updateRes.profileDetail.name;
            this.profile.age = this.updateRes.profileDetail.age;
            this.profile.gender = this.updateRes.profileDetail.gender;
            this.profile.profileImage =
              this.updateRes.profileDetail.profileImage;
            this.profileImage = this.profile.profileImage;
            //  this.questionpageHandle()
            this.loginResponse.subModel.quiz2PlayUserProfileModel.pop();
            this.loginResponse.subModel.quiz2PlayUserProfileModel.push(
              this.profile
            );
            EncDecryptUtil.Enc(this.loginResponse, 'userdata');
          } else {
            this.toastr.error(this.updateRes.statusDescription.description);
          }
        }
      });
  }
  questionpageHandle() {
    if (this.dataShare.questionurl == 'ques') {
      this.route.navigate(['']);
      this.dataShare.questionurl = '';
    } else {
      return;
    }
  }
  closeProfile() {
    this.closeModal('profile');
    this.showAge = false;
    if (this.dataShare.questionurl == 'ques') {
      this.route.navigate(['']);
    }
    this.showName = false;
    // this.profileImage = this.profile.profileImage;
    this.gender = this.profile.gender;
    this.Name = this.profile.name;
    this.Age = this.profile.age;
  }
  eyeresolver() {
    this.cuteye = !this.cuteye;
  }
  CheckloginSub(num: any, type: any) {
    let formdata = {
      msisdn: num,
      serviceId: environment.serviceId,
    };
    this.store.dispatch(new _fromAction.CheckSubs(formdata));
    this.store.select<any>(_fromStore.checkSubResponse).subscribe((data) => {
      if (data) {
        this.checkSubsRes = data;
        if (this.checkSubsRes.statusDescription.statusCode == 200) {
          // console.log(this.checkSubsRes)
          this.loginSubStatus = true;
          this.loginbool = 0;
          this.modalService.close('loginmodal');
          this.loginResponse = this.checkSubsRes;
          this.setData();
        } else {
          // this.loginPinGen(false)
          // this.loginSubStatus = false;;
          this.packShow = true;
        }
      }
    });
  }
  closelogin() {
    this.loginSubmit = false;
    this.modalService.close('loginmodal');
    this.loginbool = 0;
    this.otpvalue = '';
    this.cuteye = false;
    this.loginMsisdn = '';
    this.packShow = false;
    this.loginSubStatus = false;
    this.checkSubsRes = new CheckSubResponse();
  }
  Nameinput() {
    this.showName = !this.showName;
  }
  AgeInput() {
    this.showAge = !this.showAge;
  }
  profileModal() {
    this.modalService.open('profile');
    this.fetchProfileImage();
    this.profile = this.loginResponse.subModel.quiz2PlayUserProfileModel[0];
    this.Name = this.profile.name;
    this.Age = this.profile.age;
    this.profileImage = this.profile.profileImage;
    this.gender = this.profile.gender;
  }
  //New Subscription
  register(form: NgForm) {
    this.submitted = true;
    if (form.invalid) {
      return;
    }

    let msisdn = this.countryCode + String(this.registermsisdn);

    this.CheckNewSub(msisdn);
  }

  //OTP Submit
  Otpsubmit(form: NgForm, type: string) {
    if (form.invalid) {
      return;
    }
    if (type == 'login') {
      if (this.loginSubStatus) {
        this.loginPinverify(true);
      } else {
        this.loginPinverify(false);
      }
    } else {
      if (this.subStatus) {
        this.Pinverify(true);
      } else {
        this.Pinverify(false);
      }
    }
  }

  //Fetch Profile Image
  fetchProfileImage() {
    this.store.dispatch(new _fromAction.profileImage());
    this.store.select(_fromStore.profileImgResponse).subscribe((data: any) => {
      if (data) {
        this.profileImageRes = data;
        this.imagesList = data;
      }
    });
  }

  ///Image Selecting logic
  image(img: any) {
    this.profileImage = img.profileImageUrl;
    this.gender = img.gender;
  }
  //subscription Pack selctor
  pass(event: any, data: any) {
    this.pinreq.productId = data.id;
  }
  //login Pack Selector
  loginProduct(op: any) {
    this.loginProd = op.id;
  }
  finishTimer() {
    this.subresend = true;
  }
  finishLoginTimer() {
    this.loginresend = true;
  }
  //Resend OTP
  resend(type: string) {
    if (type == 'login') {
      if (this.loginSubStatus) {
        this.loginPinverify(true);
      } else {
        this.loginPinverify(false);
      }
    } else {
      if (this.subStatus) {
        this.Pinverify(true);
      } else {
        this.Pinverify(false);
      }
    }
  }

  //Subscription Pin Verify
  Pinverify(data: any) {
    let formdata = {
      msisdn: String(this.countryCode + this.registermsisdn),
      otp: this.otpvalue,
      transactionId: this.pinres.transactionId,
      countryCode: environment.code,
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      channel: 'WEB',
      language: localStorage.getItem('locale'),
      productId: '',
    };
    if (data == true) {
      formdata.productId = this.checkSubsRes?.subDetail.productId;
      this.fistlogin = false;
    } else {
      formdata.productId = this.pinreq.productId;
      this.fistlogin = true;
      localStorage.setItem('login', this.fistlogin);
    }
    this.store.dispatch(new _fromAction.Pinverify(formdata));
    this.store.select<any>(_fromStore.pinverResponse).subscribe((data) => {
      if (data) {
        this.loginResponse = data;
        if (this.loginResponse.statusDescription.statusCode == 200) {
          this.modalService.close('subsid');
          this.setData();
        }
      }
    });
  }
  //Login Pin Verify
  loginPinverify(data: any) {
    let formdata = {
      msisdn: String(environment.code) + this.loginMsisdn,
      otp: this.otpvalue,
      transactionId: this.loginpinres.transactionId,
      countryCode: String(environment.code),
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      channel: 'WEB',
      language: localStorage.getItem('locale'),
      productId: '',
    };
    if (data == true) {
      this.fistlogin = false;
      formdata.productId = this.checkSubsRes?.subDetail.productId;
    } else {
      formdata.productId = this.loginProd;
      this.fistlogin = true;
      localStorage.setItem('login', this.fistlogin);
    }

    this.store.dispatch(new _fromAction.Pinverify(formdata));
    this.store.select<any>(_fromStore.pinverResponse).subscribe((data) => {
      if (data) {
        this.loginResponse = data;
        if (this.loginResponse.statusDescription.statusCode == 200) {
          this.loginbool = 0;
          this.modalService.close('loginmodal');
          this.setData();
        }
      }
    });
  }
  // login Pin Generation
  loginPinGen(data: any) {
    let formdata = {
      msisdn: Number(String(environment.code) + this.loginMsisdn),
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      productId: '',
      language: localStorage.getItem('locale'),
    };
    if (data == true) {
      formdata.productId = this.checkSubsRes.subDetail.productId;
    } else {
      formdata.productId = this.loginProd;
    }

    this.store.dispatch(new _fromAction.Pingen(formdata));
    this.store.select<any>(_fromStore.pingenResponse).subscribe((data) => {
      if (data) {
        this.loginpinres = data;
        if (this.loginpinres.statusDescription.statusCode == 200) {
          window.location.href =  data.transactionId ;
        }
      }
    });
  }
  isVisible(data: any) {
    return data;
  }
  setData() {
    this.profile = this.loginResponse.subModel?.quiz2PlayUserProfileModel[0];
    this.dataShare.lives = this.profile?.live;
    this.dataShare.coins = this.profile?.coins;
    EncDecryptUtil.Enc(this.loginResponse, 'userdata');
    window.location.href = '';
    this.dataShare.Setlogin();
    this.global.setUser();
    this.dataShare.userId = this.loginResponse.userModel.id;
    this.dataShare.userProfileId = this.profile.id;
    this.dataShare.subId = this.loginResponse.subModel.id;
    this.LoggedIn = true;

    this.dataShare.loggedIn = true;
    // this.modalService.open('subsid');
    // this.otpbool=2
  }
}
