import { Component, OnInit, Output } from '@angular/core';
import { ModalService } from 'src/app/_modal';
import { Store } from '@ngrx/store';;
import * as _fromAction from '../../store/actions';
import * as _fromStore from '../../store';
import { CatagoryResponse } from 'src/app/response/catagory-response';
import { ToastrService } from 'ngx-toastr';
import { DataShareService } from 'src/app/services/data-share.service';
import { Router } from '@angular/router';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { Catagory } from 'src/app/models/catagory-model';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { GlobalUtil } from 'src/app/utils/Global-util';


@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.css']
})
export class CatagoriesComponent implements OnInit {
  catagoryres: CatagoryResponse | any;
  defaultImage = "assets/images/img-loader2.gif";
  // catagoryList: any = [];
  newArray: any;
  loginResponse: PinVerResponse | null;
  encryptInfo: string | null | any;
  userProfileId: string | undefined;
  userId: string | undefined;
  loggedIn: boolean = false
  ModalStatus: any;
  global = new GlobalUtil()
  categoryList: Catagory[] | any = [];
  LoggedIn: any;
  locale: string = "";

  constructor(private modalService: ModalService, private route: Router, private store: Store<_fromStore.MainPageState>, private toastr: ToastrService, public data: DataShareService) {
    this.loginResponse = new PinVerResponse();
    this.encryptInfo = localStorage.getItem('userdata');
    let locale = localStorage.getItem('locale');
    console.log(locale);
    if (locale) {
      this.locale = localStorage.getItem('locale');
    }



    if (this.encryptInfo != null) {
      this.loginResponse = EncDecryptUtil.dec(this.encryptInfo)
      this.userProfileId = this.loginResponse?.subModel.quiz2PlayUserProfileModel[0].id;
      this.userId = this.loginResponse?.userModel.id;
      this.loggedIn = true
    }
    this.global.user.subscribe(data => {
      if (data) {
        this.LoggedIn = data
      }
    })

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
    if (this.encryptInfo == null) {
      this.store.dispatch(new _fromAction.FetchCatagory());
      this.store.select<any>(_fromStore.fetchCatagoryResponse).subscribe(data => {
        if (data) {
          this.catagoryres = data;
          this.data.categoryRes = data;
          EncDecryptUtil.Enc(this.catagoryres, 'categoryres')
          if (this.catagoryres.statusDescription.statusCode == 200) {
          }
        }
      })
    }
    else {
      this.store.dispatch(new _fromAction.fetchCategoryWithLogin());
      this.store.select<any>(_fromStore.fetchcategoryLoginResponse).subscribe(data => {
        if (data) {
          this.catagoryres = data;
          this.data.categoryRes = data;
          EncDecryptUtil.Enc(this.catagoryres, 'categoryres')
          if (this.catagoryres.statusDescription.statusCode == 200) {
          }
        }
      })
    }

  }
  isVisible(value: any) {
    // console.log(typeof value)
    // console.log(typeof eval(value))
    return eval(value);

  }
  CatagoryRouting(op: any) {
    if (!op.categoryComplete) {
      if (!op.lockedStatus) {
        console.log(op.lockedStatus)
        return
      }
      else {
        this.encryptInfo = localStorage.getItem('userdata');
        if (this.encryptInfo == null) {
          this.modalService.open('loginmodal');
        }
        else {
          let catagoryId = op.id;
          EncDecryptUtil.Enc(catagoryId, 'categoryId');
          this.route.navigate(['categories/level'])
        }
      }
    }
    else {
      this.toastr.info("You have finished all levels of this category. Play other categories")
    }

  }
  Onclick(data: any) {
    return
  }
}
