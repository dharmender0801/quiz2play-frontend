import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Catagory } from 'src/app/models/catagory-model';
import { DataShareService } from 'src/app/services/data-share.service';
import * as _fromActions from '../../store/actions';
import * as _fromStore from '../../store'
import { environment } from 'src/environments/environment';
import { LevelResponse } from 'src/app/response/level-response';
import { Router } from '@angular/router';
import { fetchGuidelineResponse } from 'src/app/response/fetch-guideline-response';
import { Level } from 'src/app/models/level-model';
import { ToastrService } from 'ngx-toastr';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { ProfileModel } from 'src/app/models/profile-model';
import { CategoryService } from 'src/app/services/category.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ModalService } from 'src/app/_modal';
import { Buyliveresponse } from 'src/app/response/buylive-response';

@Component({
  selector: 'app-catagories-main',
  templateUrl: './catagories-main.component.html',
  styleUrls: ['./catagories-main.component.css']
})
export class CatagoriesMainComponent implements OnInit {
  defaultImage = "assets/images/img-loader2.gif";
  categoryRes: Catagory | any
  levelRes: LevelResponse | any;
  public encryptInfo: string | any | null
  categoryId: number | null | undefined;
  loginResponse = new PinVerResponse();
  guideLineres: fetchGuidelineResponse | any
  i: number = 0
  renderArray: Level[] | any = []
  profile: ProfileModel | any
  levelId: number | any;
  loginInfo: string | null;
  newList: LevelResponse | any;
  showStatus: boolean = false;
  reward: any | number;
  PageName: any;
  levelName: any;
  level_Id: any;
  Onlevel: Level | undefined;
  userProfileId: any;
  buyliveRes: Buyliveresponse | undefined;
  showAllhide: boolean = false;
  locale: string;
  levelPlayedIndex: any;

  constructor(private data: DataShareService, private spinner: NgxSpinnerService, public modal: ModalService, private store: Store<_fromStore.CategoryState>, private route: Router, private toastr: ToastrService, private category: CategoryService) {
    this.categoryRes = new Catagory();
    this.levelRes = new LevelResponse();
    this.loginInfo = localStorage.getItem('userdata');
    this.encryptInfo = localStorage.getItem('categoryId');
    let locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = localStorage.getItem('locale')
    }
    if (this.encryptInfo != null) {
      this.categoryId = EncDecryptUtil.dec(this.encryptInfo)
    }
    if (this.loginInfo != null) {
      this.loginResponse = EncDecryptUtil.dec(this.loginInfo);
      this.userProfileId = this.data.userProfileId
      // this.profile.id = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id

    }
    this.locale = localStorage.getItem("locale")

  }

  ngOnInit(): void {
    this.newList = new LevelResponse()
    this.Onlevel = new Level()
    this.guideLineres = new fetchGuidelineResponse();
    this.buyliveRes = new Buyliveresponse()
    this.fetchlevel();
    // this.fetchguidelines();
    this.scrollTop()
  }
  eval(data: any) {
    return data
  }
  scrollTop() {
    window.scroll(0, 0)
  }
  Home() {
    this.closeModal('nolive');
    this.route.navigate([''])
  }
  fetchlevel() {
    this.spinner.show()
    let formdata = {
      categoryId: this.categoryId,
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      userProfileId: this.userProfileId,
      language: localStorage.getItem('locale')
    }
    this.renderArray = []

    this.category.fetchLevel(formdata).subscribe((data) => {
      if (data) {
        this.levelRes = data;
        if (this.levelRes.statusDescription.statusCode == 200) {
          this.spinner.hide()
          if (this.levelRes.levelList.length < 13) {

            this.showAllhide = false
            this.renderArray = this.levelRes.levelList.filter((x) => { return x.levelStatus != 1 || x.levelStatus == 2 });
            this.Onlevel = this.levelRes.levelList.find((x) => { return x.levelStatus == 1 })
            this.levelId = this.Onlevel.id;
            this.level_Id = this.Onlevel.levelId;
          }
          else {
            this.showAllhide = true;
            this.renderArray = [];
            this.levelRes.levelList.forEach((e, i) => {
              if (e.levelStatus == 1) {
                this.levelPlayedIndex = i
              }

            });
            if (this.levelPlayedIndex > 13) {
              this.renderArray = [...this.levelRes.levelList]
            } else {
              this.renderArray = this.levelRes.levelList.filter((x, i) => { return i < 13 && x.levelStatus != 1 });
            }


            // this.renderArray=this.levelRes.levelList.filter ((x,i)=>{return i<=13 && x.levelStatus !=1})
            this.Onlevel = this.levelRes.levelList.find((x) => { return x.levelStatus == 1 });
            this.levelId = this.Onlevel.id;
            this.level_Id = this.Onlevel.levelId
            // if(this.levelRes.levelList.length >12){
            //   this.renderArray = this.levelRes.levelList.filter((x)=>{return x.levelStatus  != 1});
            //   this.Onlevel = this.levelRes.levelList.find((x)=>{return x.levelStatus ==1  })
            //   this.levelId = this.Onlevel.id;
            //   this.level_Id = this.Onlevel.levelId;
            // }
          }
        }

      }
    })

  }
  ShowLess() {
    this.showStatus = !this.showStatus
    this.renderArray = []
    this.renderArray = this.levelRes.levelList.filter((x, i) => { return i < 13 && x.levelStatus != 1 })

  }
  ShowAll() {
    this.renderArray = []
    this.showStatus = !this.showStatus
    this.renderArray = this.levelRes.levelList.filter((x) => { return x.levelStatus != 1 })
  }
  Playbutton() {
    if (this.data.lives != 0) {
      this.renderArray = [];
      let levelID = EncDecryptUtil.Enc(this.levelId, 'levelId');
      let CategoryId = EncDecryptUtil.Enc(this.categoryId, 'categoryId');
      EncDecryptUtil.Enc(this.level_Id, "level_Id");
      // EncDecryptUtil.Enc(this.Onlevel.questionPlayedCount,"Ques")`
      let quesCount = new String(this.Onlevel.questionPlayedCount)
      localStorage.setItem('Ques', String(quesCount))
      this.route.navigate([`categories/ques`]);
      EncDecryptUtil.Enc(this.levelRes, 'Levellist')
    }
    else {
      this.data.Nolive();

    }
  }
  finishLoginTimer() {

  }
  handleEvent(data) {

  }
  Back() {

    let categoryres = localStorage.getItem('categoryres');
    this.categoryRes = EncDecryptUtil.dec(categoryres)
    // this.categoryRes= EncDecryptUtil.dec('categoryres')
    this.renderArray = []
    if (this.categoryRes.categoryList[2].lockedStatus == true) {
      this.route.navigate(['../']);
      // document.location.pathname ='/'
    }
    else {
      if (this.categoryId == this.categoryRes.categoryList[0].id) {
        this.categoryId = this.categoryId + 1;
      }
      else {
        this.categoryId = this.categoryId - 1;
      }

      this.fetchlevel();
      this.Onlevel = this.levelRes.levelList.find((x) => { return x.levelStatus == 1 });

      EncDecryptUtil.Enc(this.Onlevel.id, "levelId")

      EncDecryptUtil.Enc(this.categoryId, "categoryId")
      this.route.navigate(['../categories/level'])
    }
  }
  closeModal(id) {
    this.modal.close(id)
  }

  Buylive() {
    if (this.data.coins < this.Onlevel.coins) {
      this.closeModal('nolive')
      this.toastr.error("You have Insufficient Coins");

      setTimeout(() => {
        this.route.navigate(['/buycoin']);
      }, 3000)
      console.log(this.data.coins, this.Onlevel.coins)
    }
    else {
      let level = this.Onlevel.level.trim()
      let formdata = {
        userProfileId: this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id,
        levelName: level,
        language: localStorage.getItem('locale')
      }
      this.store.dispatch(new _fromActions.buyLives(formdata));
      this.store.select<any>(_fromStore.buyliveResponse).subscribe((data: any) => {
        if (data) {
          this.buyliveRes = data;
          if (this.buyliveRes.statusDescription.statusCode == 200) {
            this.modal.close('nolive');
            this.data.coins = this.buyliveRes.profileModel.coins;
            this.data.lives = this.buyliveRes.profileModel.live
            this.loginResponse.subModel.quiz2PlayUserProfileModel[0].coins = this.buyliveRes.profileModel.coins;
            this.loginResponse.subModel.quiz2PlayUserProfileModel[0].live = this.buyliveRes.profileModel.live;


            this.toastr.success(this.buyliveRes.statusDescription.description)
            EncDecryptUtil.Enc(this.loginResponse, 'userdata')
          }
          else if (this.buyliveRes.statusDescription.statusCode == 217) {
            this.closeModal('nolive')

            this.route.navigate(['/buycoin']);
          }


        }
      })

    }





  }


  questions(data) {
    this.toastr.warning("You have already completed this level")
  }
}


