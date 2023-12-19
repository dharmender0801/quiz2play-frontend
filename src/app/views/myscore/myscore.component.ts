import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CatagoryResponse } from 'src/app/response/catagory-response';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { DataShareService } from 'src/app/services/data-share.service';
import { ModalService } from 'src/app/_modal';
import { environment } from 'src/environments/environment';
import * as _fromStore from '../../store';
import * as _fromAction from "../../store/index";
import * as CryptoJS from 'crypto-js';
import { Scoreresponse } from 'src/app/response/score-list-response';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { RankingRes } from 'src/app/response/ranking-response';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-myscore',
  templateUrl: './myscore.component.html',
  styleUrls: ['./myscore.component.css']
})
export class MyscoreComponent implements OnInit {
  loginResponse: PinVerResponse | any;
  public encryptInfo: String | null;
  userProfileId: string | any;
  userId: string | any;
  loggedIn: boolean | any;
  catagoryres: CatagoryResponse | any;
  value: string | any = 1;
  scoreRes: Scoreresponse | any
  categoryName: any;
  categoryImage: any;
  renderArray: any = [];
  rankingres: RankingRes | any;
  array: any = [];
  i: any;
  levelmodel: any;
  levelScore: any;
  userList: any = [];


  constructor(public store: Store<_fromStore.CategoryState>, public translate: TranslateService, public modal: ModalService, public data: DataShareService, public route: Router) {
    this.loginResponse = new PinVerResponse();
    this.catagoryres = new CatagoryResponse();
    this.encryptInfo = localStorage.getItem('userdata');

    if (this.encryptInfo != null) {
      var deData = CryptoJS.AES.decrypt(decodeURIComponent(this.encryptInfo.toString()), environment.key);
      this.loginResponse = JSON.parse(deData.toString(CryptoJS.enc.Utf8));
      this.userProfileId = this.loginResponse?.subModel.quiz2PlayUserProfileModel[0].id;
      this.userId = this.loginResponse?.userModel.id;
      this.loggedIn = true
    }
    //  this.userProfileId = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id
    let category = localStorage.getItem("categoryres");
    this.catagoryres = EncDecryptUtil.dec(category);
    this.renderArray = this.catagoryres.categoryList.filter((x) => { return x.lockedStatus });
  }


  ngOnInit(): void {
    this.scoreRes = new Scoreresponse();
    this.rankingres = new RankingRes()
    this.fetchScore(this.catagoryres.categoryList[0].id)
  }
  PlayGame() {
    EncDecryptUtil.Enc(this.scoreRes.playLevel.categoryId, 'categoryId');
    this.route.navigate(['categories/level'])
  }
  fetchScore(id: string | any) {

    if (this.value == "") {
      return
    }
    else {
      this.value = id
      let Obj = this.catagoryres.categoryList.find((data) => { return data.id == this.value });
      this.categoryName = Obj.pageName;
      this.categoryImage = Obj.mockupPath;

      let formdata = {
        categoryId: id,
        serviceId: environment.serviceId,
        portalId: environment.portalId,
        userProfileId: this.userProfileId,
        language: localStorage.getItem('locale')
      }
      this.store.dispatch(new _fromAction.showScore(formdata));
      this.store.select<Scoreresponse>(_fromStore.fetchScoreResponse).subscribe((data: any) => {
        if (data) {
          this.scoreRes = data;
        }
      })
    }


  }
  Evaluate(data: any) {
    let Value = parseInt(data);
    if (Value == 100) {
      return true
    }
    else {
      return false
    }
  }
  closeModal(id: string) {
    this.modal.close(id)
  }

  Ranking(data: any) {
    this.levelmodel = data.categoryLevel;
    this.levelScore = data.levelScore
    this.modal.open("ranking");
    this.fetchranking(data)
  }
  fetchranking(data: any) {
    let formdata = {
      categoryId: data.categoryId,
      levelId: data.levelId,
      serviceId: data.serviceId,
      portalId: data.portalId,
      language: localStorage.getItem('locale')
    }
    this.store.dispatch(new _fromAction.ranking(formdata));
    this.store.select<RankingRes>(_fromStore.fetchRankingResponse).subscribe((data) => {
      if (data) {
        this.userList = []
        this.rankingres = data;
        // this.rankingres.rankingUserList = this.rankingres.rankingUserList.filter((x) => {
        //   return x.score != 0
        // })this

        this.rankingres.rankingUserList.forEach(element => {
          if (element.score != 0) {
            this.userList.push(element)
          }
        });
        console.log(this.rankingres.rankingUserList);
        console.log(this.userList)
        // this.rankingres.rankingUserList = this.rankingres.rankingUserList.filter(x => {
        //   return x.score != 0
        // })
        console.log(this.rankingres.rankingUserList.filter((x) => {
          return x.score != 0
        })
        )
      }

    })

  }
}
