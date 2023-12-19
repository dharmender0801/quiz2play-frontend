import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginResponse } from '../models/loginresponse';
import { BannerRs } from '../response/banner-response';

import { LogoutResponse } from '../response/logout-response';
import { PinVerResponse } from '../response/pin-verfy-request';
import { ProductResponse } from '../response/product-response';

import { EncDecryptUtil } from '../utils/EncDec-util';
import { ApiSvcService } from './api-svc.service';

@Injectable({
  providedIn: 'root',
})
export class HomepageService {
  public encryptInfo;
  public userProfileId: number | undefined;
  loginResponse: PinVerResponse | undefined;
  portalId = environment.portalId;
  serviceId = environment.serviceId;
  constructor(private apiSvc: ApiSvcService, private http: HttpClient) {
    this.encryptInfo = localStorage.getItem('userdata');
    if (this.encryptInfo != null) {
      this.loginResponse = EncDecryptUtil.dec(this.encryptInfo);
      this.userProfileId =
        this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id;
    }
  }
  url = environment.url;

  getbanner(): Observable<BannerRs> {
    return this.apiSvc.get(
      `${this.url}/banner/v1/list?portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
  pinGen(form: any) {
    return this.apiSvc.post(`${this.url}/auth/v1/pin/generate`, form);
  }
  pinVerify(form: any) {
    return this.apiSvc.post(`${this.url}/auth/v1/pin/verify`, form);
  }
  login(form: any): Observable<LoginResponse> {
    return this.apiSvc.post(`${this.url}/auth`, form);
  }
  fetchCatagory(): Observable<any> {
    return this.apiSvc.get(
      `${this.url}/category/v1/list?portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
  fetchProduct(form: any): Observable<ProductResponse> {
    return this.apiSvc.post(`${this.url}/product/v1/list`, form);
  }
  fetchOperator(): Observable<any> {
    return this.apiSvc.get(
      `${this.url}/operator/v1/list?portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
  fetchSubs(form: any): Observable<any> {
    return this.apiSvc.post(`${this.url}/subscription/v1/check`, form);
  }
  updateProfile(form: any) {
    return this.apiSvc.post(`${this.url}/profile/v1/update`, form);
  }
  unsubApi(form: any): Observable<any> {
    return this.apiSvc.post(`${this.url}/auth/v1/unsubscribe `, form);
  }
  logoutApi(form: any): Observable<LogoutResponse> {
    return this.apiSvc.post(`${this.url}/auth/v1/logout`, form);
  }
  profileimage() {
    return this.apiSvc.get(
      `${this.url}/profile-image/v1/list?portalId=${this.portalId}&serviceId=${
        this.serviceId
      }&language=${localStorage.getItem('locale')}`
    );
  }
  buycoins() {
    return this.apiSvc.get(
      `${this.url}/coins/v1/purchase?portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
  howtoPlay(form: any) {
    return this.apiSvc.post(`${this.url}/play/v1/help`, form);
  }
  PlayButton(form: any) {
    return this.apiSvc.post(`${this.url}/play/v1/direct`, form);
  }
  BuycoinsWithLogin() {
    return this.apiSvc.get(
      `${this.url}/coins/v2/purchase?portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
  fetchCatagoryWithlogin(): Observable<any> {
    return this.apiSvc.get(
      `${this.url}/category/v2/list?portalId=${this.portalId}&serviceId=${this.serviceId}&userProfileId=${this.userProfileId}`
    );
  }
  fetchRanking(form: any) {
    return this.apiSvc.post(`${this.url}/ranking/v1/list`, form);
  }
  searchCategories(form: any) {
    return this.apiSvc.get(
      `${this.url}/search/v1/list?keyword=${form}&portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
  searchCategoriesLogin(form: any) {
    return this.apiSvc.get(
      `${this.url}/search/v2/list?keyword=${form}&portalId=${this.portalId}&serviceId=${this.serviceId}&userProfileId=${this.userProfileId}`
    );
  }

  fetchLanguages() {
    return this.apiSvc.get(
      `${this.url}/language/v1/list?portalId=${this.portalId}`
    );
  }
  fetchoperatorprop(form: any) {
    return this.apiSvc.get(
      `${this.url}/operator/v1/url?portalId=${this.portalId}&serviceId=${this.serviceId}`
    );
  }
}
