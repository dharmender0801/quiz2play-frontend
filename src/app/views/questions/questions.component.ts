import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Level } from 'src/app/models/level-model';
import { DataShareService } from 'src/app/services/data-share.service';
import * as _fromStore from '../../store/index';
import * as _fromAction from '../../store/actions'
import { Store } from '@ngrx/store';
import { environment } from 'src/environments/environment';
import { QuesAnsResponse } from 'src/app/response/ques-ans-response';
import { QuesAnsModel } from 'src/app/models/ques-Ans-model';
import { ToastrService } from 'ngx-toastr';
import { ModalService } from 'src/app/_modal';
import { Router } from '@angular/router';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { RerollResponse } from 'src/app/response/reroll-response';
import { ProfileModel } from 'src/app/models/profile-model';
import { HomepageService } from 'src/app/services/homepage.service';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { LevelResponse } from 'src/app/response/level-response';
import { Buyliveresponse } from 'src/app/response/buylive-response';
import { CountdownComponent } from 'ngx-countdown';
import { Updatelogsresponse } from 'src/app/response/update-logs-response';
import { RankingRes } from 'src/app/response/ranking-response';
import { LocationStrategy } from '@angular/common';
import { BuyLive } from 'src/app/models/buylive-resp';
import { ProfileImageResponse } from 'src/app/response/profile-Image-response';
@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  showred: boolean;
  timerStop: boolean;
  reinitialiseTimer: boolean;
  boosterstatus: boolean | any = false;
  star: any;
  levelmodel: any;
  levelScore: any;
  timerHide: boolean;
  Buyliveres: BuyLive | undefined
  levelres: LevelResponse | undefined
  levelId: string | undefined | any;
  quesAnsRes: QuesAnsResponse | any;
  rerollReslist: QuesAnsResponse | any
  question: QuesAnsModel | any;
  i: number = 0
  triviaShow: number = 0;
  optiontype: string | undefined
  userValue: string | any;
  quesStatus: number | undefined = 3
  selected: boolean = false;
  encryptInfo: string | undefined | null;
  UpdatelogsRes: Updatelogsresponse | any
  loginInfo: string | null;
  userId: any;
  loginResponse = new PinVerResponse()
  fetchCategoryId: string | null;
  categoryId: any;
  questionId: any;
  quesCorrectStatus: any;
  rerollRes: RerollResponse | any;
  buyliveRes: Buyliveresponse | any;
  profile: ProfileModel | any
  level: Level | undefined;
  nextLevel: boolean = false;
  levelRes: LevelResponse | any
  reward: any;
  PageName: any;

  @ViewChild('countdown', { static: false }) private countdown: CountdownComponent;
  level_Id: number | any;
  levelList: Level[] | undefined;
  countDown: number | undefined;
  timerColor: number = 0
  timerObj: any;
  categoryRes: any;
  userAnswertime: number | undefined
  index: any | undefined;
  notifyArray = []
  rankingres: RankingRes;
  userProfileId: any;
  Name: any;
  userScore: number;
  profileImageRes: ProfileImageResponse | any;
  rerollStatus: boolean;
  levelCoins: any;
  onetimeClick: boolean = false;
  modalId: string;
  locale: string;



  constructor(public data: DataShareService, private locationStrategy: LocationStrategy, public home: HomepageService, public route: Router, private store: Store<_fromStore.CategoryState>, public toastr: ToastrService, public modal: ModalService) {
    this.levelres = new LevelResponse();
    $(document).ready(function () {
      $("countdown").css("direction", "ltr");

    });

    $('')
    this.loginResponse = new PinVerResponse()
    this.encryptInfo = localStorage.getItem('levelId');
    this.loginInfo = localStorage.getItem('userdata');
    this.fetchCategoryId = localStorage.getItem('categoryId');
    let LevelRes = localStorage.getItem('Levellist');
    if (LevelRes != null) [
      this.levelRes = EncDecryptUtil.dec(LevelRes)
    ]
    if (this.fetchCategoryId != null && this.loginInfo != null && this.encryptInfo != null) {
      let level_Id = localStorage.getItem('level_Id');
      if (level_Id != null) {
        this.level_Id = EncDecryptUtil.dec(level_Id)
      }
      let locale = localStorage.getItem('locale');
      if (locale) {
        this.locale = localStorage.getItem('locale')
      }
      this.categoryId = EncDecryptUtil.dec(this.fetchCategoryId);
      this.levelId = EncDecryptUtil.dec(this.encryptInfo);
      this.loginResponse = EncDecryptUtil.dec(this.loginInfo)
      this.userId = this.loginResponse.userModel.id;
      this.profile = this.loginResponse.subModel.quiz2PlayUserProfileModel[0];
      this.userProfileId = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id;
      this.Name = this.loginResponse.subModel.quiz2PlayUserProfileModel[0].name
    }

  }

  //backbutton disable 
  preventBackButton() {
    history.pushState(null, null, location.href);
    this.locationStrategy.onPopState(() => {
      history.pushState(null, null, location.href);
    })
  }
  ngOnInit(): void {
    this.quesAnsRes = new QuesAnsResponse();
    this.Buyliveres = new BuyLive()
    this.question = new QuesAnsModel();
    this.UpdatelogsRes = new Updatelogsresponse();
    this.rerollRes = new RerollResponse();
    this.buyliveRes = new Buyliveresponse();
    this.rankingres = new RankingRes();
    this.fetchques();
    if (this.data.lives == 0) {
      this.timerHide = true;
      this.timerColor = 2;

    }
  }
  DisableReload() {
    localStorage.setItem("Ques", this.i.toString());

  }
  end() {
    this.timerColor = 4
  }

  openModal(id: string) {
    this.modalId = id
    this.modal.open(id);

    this.countdown.pause();
    this.countdown.stop()
    // if(this.i == this.level.questionCount -1){
    //   this.selected = false
    // }

    if (id != 'rank') {
      this.countdown.pause()
    }


  }

  closeModal(id: string) {
    this.modal?.close(id);
    if (id != 'nolive') {
      this.countdown.restart()
    }
    if (id != 'livepopup') {
      this.countdown.restart()
    }
    this.countdown.restart()

  }


  NextLevel() {
    this.openModal('nextLevel');
    this.reset();
  }
  QuesAnsCheck(option: any, type: string) {
    if (!this.selected) {
      if (this.data.lives != 0) {
        this.selected = true;
        this.userValue = option.trim();
        this.optiontype = type;
        let correct = this.question?.correctAnswer.trim()
        let Answer = this.userValue.toUpperCase() == correct?.toUpperCase()
        if (Answer) {
          this.questionId = this.question?.id;
          this.quesCorrectStatus = true
          this.quesStatus = 1   //true;
          this.quesSelected()
        }
        else {
          this.data.lives = this.data.lives - 1;
          this.quesCorrectStatus = false
          this.quesStatus = 0 //false;
          this.quesSelected()
        }

      }
      else {
        this.openModal('nolive');


      }
    }
  }

  quesSelected() {
    this.triviaShow = 1;
    this.questionId = this.question?.id;
    this.selected = true
    this.countdown.stop()
    this.timerStop = true;
    this.UpdateUserLogs()
    if (this.i == this.level.questionCount - 1) {
      this.data.coins = this.data.coins + this.level.rewards;
    }

    this.profile = this.loginResponse?.subModel.quiz2PlayUserProfileModel[0];
    this.profile.live = this.data.lives
    this.data.UpdateProfile(this.profile)
    localStorage.setItem("Ques", this.i.toString())


  }
  UpdateUserLogs() {

    let formdata = {
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      userId: this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id,
      categoryId: this.categoryId,
      levelId: this.level_Id,
      questionId: this.questionId,
      questionCorrectStatus: this.quesCorrectStatus,
      questionScore: 0,
      questionStar: 0,
      language: localStorage.getItem('locale'),
      userAnswerTime: this.userAnswertime,
      msisdn: this.loginResponse?.subModel.quiz2PlayUserProfileModel[0].msisdn
    }

    this.store.dispatch(new _fromAction.updateLogs(formdata));
    this.store.select<any>(_fromStore.fetchuserLogsResponse).subscribe((data: any) => {
      if (data) {
        this.UpdatelogsRes = data;
        if (this.UpdatelogsRes.statusDescription.statusCode == 200) {
          // this.countdown.pause()
          this.boosterstatus = this.UpdatelogsRes.status;
          this.star = this.UpdatelogsRes.star;

          setTimeout(() => {
            this.popuplogic()
          }, 1000)
        }
      }

    })
  }

  popuplogic() {
    if (this.boosterstatus == true && this.data.lives != 0 && this.selected == true && this.quesCorrectStatus == true &&
      this.triviaShow == 1) {
      if (this.i == this.level.questionCount - 1) {
        setTimeout(() => {
          this.openModal('boostermodal');
        }, 500);

        this.boosterstatus = false
      }

    }
    else if (this.data.lives != 0 && this.selected == true && this.quesCorrectStatus == true &&
      this.triviaShow == 1 && this.UpdatelogsRes.status == false) {
      this.popupOpen();
    }
  }

  ngOnDestroy(): void {
    this.question = new QuesAnsModel();
    this.quesAnsRes = new QuesAnsResponse();
    this.levelres = new LevelResponse();
    this.loginResponse = new PinVerResponse();
    this.Buyliveres = new BuyLive();
    this.UpdatelogsRes = new Updatelogsresponse();
    this.rerollRes = new RerollResponse();
    this.buyliveRes = new Buyliveresponse();
    this.rankingres = new RankingRes();

  }
  CloseTimerEnd() {
    this.modal.close('livepopup');
    this.selected = true;
    this.route.navigate(['/categories/level'])
  }
  closeNolive() {
    this.modal.close('nolive');

  }
  playNextLevel() {
    if (!this.onetimeClick) {
      this.reset()
      this.countdown.restart()
      localStorage.removeItem("Ques")

      if (this.levelRes?.category.totalLevel == this.level_Id) {
        this.categoryId = this.categoryId + 1;
        let Id = EncDecryptUtil.Enc(this.categoryId, 'categoryId')
        this.route.navigate(['../categories/level']);
        this.onetimeClick = true
      }
      else {
        let LevelRes = localStorage.getItem('Levellist');
        this.levelRes = EncDecryptUtil.dec(LevelRes);
        // this.level_Id = this.level_Id+1
        this.levelId = new Number(this.levelRes?.levelList[this.level_Id].id);
        this.level_Id = this.levelRes?.levelList[this.level_Id].levelId
        this.fetchques();
        this.closeModal('nextLevel');
        if (this.UpdatelogsRes.status) {
          this.closeModal('boostermodal')
        }
        this.modal.close("rank");
        this.onetimeClick = true
      }
    }


  }

  popupOpen() {
    this.countdown.pause();
    this.countdown.stop()
    if (this.i < this.level.questionCount - 1) {
      return
    } else {
      if (this.levelRes?.category.totalLevel != this.level_Id) {
        setTimeout(() => {
          this.NextLevel();
        }, 1000);

      }
      else {
        setTimeout(() => {
          this.openModal('nextCategory');
          this.reset()
        }, 1000);

      }

    }
  }
  NextCategory() {
    this.closeModal('nextCategory');
    this.route.navigate(['/'])
  }
  finishLoginTimer() {
    if (this.selected != true) {
      this.openModal('livepopup')
    }
    this.countdown.stop();
    this.countdown.pause()
    this.timerColor = 2
    this.triviaShow = 2
    if (this.data.lives != 0) {

      this.countdown.stop();
      this.countdown.pause()
      this.showred = true;
      this.countdown.stop()
      this.timerStop = true
      this.data.lives = this.data.lives - 1;
      this.questionId = this.question?.id;
      this.quesCorrectStatus = false
      this.quesStatus = 0 //false;
      this.profile = this.loginResponse?.subModel.quiz2PlayUserProfileModel[0];
      this.profile.live = this.data.lives
      this.data.UpdateProfile(this.profile)
      localStorage.setItem("Ques", this.i.toString())
      this.UpdateUserLogs()
    }

  }

  fetchques() {
    this.question = new QuesAnsResponse()
    this.i = 0;
    let formdata = {
      levelId: this.levelId,
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      categoryId: this.categoryId,
      userProfileId: this.profile.id,
      level_id: this.level_Id,
      language: localStorage.getItem('locale')
    }
    this.store.dispatch(new _fromAction.fetchQues(formdata));
    this.store.select<any>(_fromStore.fetchQuesResponse).subscribe((data: any) => {
      if (data) {
        this.quesAnsRes = data
        if (this.quesAnsRes.statusDescription.statusCode == 200) {
          this.index = localStorage.getItem("Ques")
          if (this.index != null) {
            this.i = parseInt(this.index)
          }
          this.timerColor = 0
          this.question = this.quesAnsRes?.queAnsList[this.i];
          this.levelCoins = this.quesAnsRes?.level.coins;

          this.level = this.quesAnsRes.level;
          this.Buyliveres = this.quesAnsRes.buyLive
          this.countdown?.begin()
          EncDecryptUtil.Enc(this.levelId, 'levelId');
          EncDecryptUtil.Enc(this.level_Id, "level_Id")
        };
      }


    })
  }
  handleEvent(data: any) {
    if (this.data.lives != 0) {
      this.countDown = (data.left) / 1000;
      this.userAnswertime = this.level.levelTimer - this.countDown;

      // let StartTimer= parseInt(this.level.levelTimer.toString().concat('000'))
      if (this.userAnswertime != 0) {

      }
      if (data.left == 10000) {
        this.timerColor = 1
      }
      else if (data.left == 5000) {
        this.timerColor = 2
      }
      else if (data.action == "Start") {
        // this.timerColor=3
      }
    }
  }
  Back() {


    this.closeModal('livepopup')
    let categoryres = localStorage.getItem('categoryres');
    this.categoryRes = EncDecryptUtil.dec(categoryres)
    // this.categoryRes= EncDecryptUtil.dec('categoryres')
    if (this.categoryRes.categoryList[2].lockedStatus == true) {
      setTimeout(() => {
        this.route.navigate(['../'])
      }, 1000)

    }
    else {
      if (this.categoryId == this.categoryRes.categoryList[0].id) {
        this.categoryId = this.categoryId + 1;
      }
      else {
        this.categoryId = this.categoryId - 1;
      }


      let categoryId = EncDecryptUtil.Enc(this.categoryId, "categoryId")
      this.route.navigate(['../categories/level'])
    }
    this.ngOnDestroy()
  }
  homebutton() {
    if (this.modalId == 'rank') {
      this.closeModal('rank')
    }
    else {
      this.closeModal('nolive')
    }


    // this.playNextLevel();
    this.logUpdation();
    this.route.navigate(['../']);
    // localStorage.removeitem('categoryId');
    // this.ngOnDestroy();

  }
  logUpdation() {
    this.levelId = new Number(this.levelRes?.levelList[this.level_Id].id);
    this.level_Id = this.levelRes?.levelList[this.level_Id].levelId;
    this.quesCorrectStatus = false;
    this.questionId = this.question?.id;
    this.fetchques();

    this.quesCorrectStatus = false;
    this.UpdateUserLogs();


  }
  reset() {
    this.triviaShow = 0;
    this.quesStatus = 3;
    this.selected = false
    this.optiontype = "";
    this.userValue = "";
    this.timerColor = 0;
    this.data.reinitialiseTimer.next(true);
    this.boosterstatus = false;
    this.timerHide = false;
    // this.countdown.restart();
    this.onetimeClick = false

  }

  // Next Question
  NextQues() {
    this.countdown.restart();
    if (this.i != this.level.questionCount - 1) {
      this.reset();
    }
    if (this.data.lives != 0) {

      if (this.i < this.level.questionCount - 1) {
        this.i = this.i + 1
        this.question = this.quesAnsRes.queAnsList[this.i]
      } else {

      }
    } else {
      this.openModal('nolive')
      // this.modal.open('nolive');
      this.countdown.pause()
    }
    localStorage.removeItem("Ques");
    if (this.i < this.level.questionCount - 1) {
      localStorage.setItem("Ques", this.i.toString())
    }
    else {
      localStorage.removeItem("Ques")
    }

  }


  //ReRoll Question When you have Life 
  ReRoll() {
    this.countdown.restart()
    if (this.data.lives == 0) {
      this.openModal('nolive');
      this.rerollStatus = true
    }
    else {
      let formdata = {
        levelId: this.levelId,
        serviceId: environment.serviceId,
        portalId: environment.portalId,
        categoryId: this.categoryId,
        language: localStorage.getItem('locale')
      }
      this.store.dispatch(new _fromAction.rollQues(formdata))
      this.store.select<any>(_fromStore.fetchRellResponse).subscribe((data: any) => {
        if (data) {
          this.rerollRes = data;
          this.rerollReslist = data

          if (this.rerollRes?.statusDescription.statusCode == 200) {
            this.question = new QuesAnsModel();
            this.reset()
            this.question = this.rerollReslist.queAnsList
          }
          else if (this.rerollRes?.statusDescription.statusCode == 213) {


            if (this.locale === 'ar') {
              this.toastr.info(" قريبا")
            }
            if (this.locale == 'en') {
              this.toastr.info("Coming Soon")
            }
            this.selected = true;
            this.quesStatus = 0

          }
        }
      })
    }
    // this.toastr.info("Coming Soon")
  }
  Buylive() {
    if (this.quesAnsRes.level.coins < this.data.coins) {
      let formdata = {
        userProfileId: this.loginResponse.subModel.quiz2PlayUserProfileModel[0].id,
        levelName: this.level.level,
        language: localStorage.getItem('locale')

      }

      this.store.dispatch(new _fromAction.buyLives(formdata));
      this.store.select<any>(_fromStore.buyliveResponse).subscribe((data: any) => {
        if (data) {
          this.reset()
          this.buyliveRes = data;
          if (this.buyliveRes.statusDescription.statusCode == 200) {
            this.data.coins = this.buyliveRes.profileModel.coins;
            this.data.lives = this.buyliveRes.profileModel.live
            this.loginResponse.subModel.quiz2PlayUserProfileModel[0].coins = this.buyliveRes.profileModel.coins;
            this.loginResponse.subModel.quiz2PlayUserProfileModel[0].live = this.buyliveRes.profileModel.live;
            this.timerHide = false;
            // this.countdown.restart();
            if (this.rerollStatus) {
              this.ReRoll();

            }
            this.rerollStatus = false
            this.timerColor = 0;
            this.closeModal('nolive');
            this.closeModal('livepopup')
            // this.modal.close('nolive');
            // this.modal.close('livepopup')
            this.toastr.success(this.buyliveRes.statusDescription.description)
          }

        }
      })
    }
    else {
      this.closeModal('nolive')
      this.closeModal('livepopup');
      var res = ''
      if (this.locale == 'en') {
        res = "Sorry Insufficient Coins ! Buy Coins to Play";
      }
      if (this.locale == 'ar') {
        res = "Sآسف عملات غير كافية! شراء عملات معدنية للعب";
      }

      this.toastr.error(res)
      this.route.navigate(['/buycoin']);


    }


    // }






  }

  ScoreCheck() {
    this.closeModal('nextLevel')
    // this.modal.close('nextLevel')
    this.Ranking()
  }
  Ranking() {
    this.openModal('rank')
    this.modal.open("rank");
    this.fetchranking()
  }
  fetchranking() {
    let formdata = {
      categoryId: this.categoryId,
      levelId: this.level_Id,
      serviceId: environment.serviceId,
      portalId: environment.portalId,
      language: localStorage.getItem('locale')
    }
    this.store.dispatch(new _fromAction.ranking(formdata));
    this.store.select<any>(_fromStore.fetchRankingResponse).subscribe((data) => {
      if (data) {
        this.rankingres = data;
        let Obj = this.rankingres.rankingUserList.find((x) => { return x.userProfileId === this.userProfileId });
        this.userScore = Obj.score
      }

    })


  }
  Home() {
    window.location.href = "";
    this.question = new QuesAnsModel();
    this.quesAnsRes = new QuesAnsResponse();
  }
  editModel() {
    this.modal.close('rank');
    this.modal.close('nextLevel')
    this.route.navigate(['/']);
    this.levelId = new Number(this.levelRes?.levelList[this.level_Id].id);
    this.level_Id = this.levelRes?.levelList[this.level_Id].levelId;
    EncDecryptUtil.Enc('levelId', this.levelId);
    EncDecryptUtil.Enc('level_Id', this.level_Id);
    //  localStorage.removeItem('categoryId')
    // this.data.questionurl = 'ques';

    let dataObj: boolean = true;
    this.playNextLevel()
    localStorage.setItem("openProfile", dataObj + "");
    this.logUpdation()
    // this.ngOnDestroy()

  }
  fetchProfileImage() {
    this.store.dispatch(new _fromAction.profileImage());
    this.store.select(_fromStore.profileImgResponse).subscribe((data: any) => {
      if (data) {
        this.profileImageRes = data;
      };

    })
  }
  //countdown functions 



  restart() {
    this.countdown.restart()
  }
  stop() {
    this.countdown.stop();

  }
  start() {
    this.countdown.begin()
  }
}
