import { Component, Input, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { LoginResponse } from 'src/app/models/loginresponse';
import { ProfileModel } from 'src/app/models/profile-model';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { ProfileImageResponse } from 'src/app/response/profile-Image-response';
import { UpdateProfilRes } from 'src/app/response/update-profile-response';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { ModalService } from 'src/app/_modal';
import * as _fromStore from '../../store';
import * as _fromAction from '../../store/actions';

@Component({
  selector: 'app-update-profile',
  templateUrl: './update-profile.component.html',
  styleUrls: ['./update-profile.component.css']
})
export class UpdateProfileComponent implements OnInit {
  @Input() profileDetails?:ProfileModel;
  showName: boolean;
  showAge: boolean;
  Name: any;
  Age: any;
  gender: any;
  profileImage: any;
  msisdn: any;
  dataShare: any;

  constructor(public   translate:TranslateService,public modalService:ModalService ,public store:Store<_fromStore.MainPageState>,private toastr :ToastrService,private activeModal: NgbActiveModal) { }
 updateRes : UpdateProfilRes | undefined;
 profileImageRes: ProfileImageResponse | undefined;
 profile:ProfileModel | undefined;
 loginResponse:PinVerResponse ;

  ngOnInit(): void {
    this.updateRes = new UpdateProfilRes();
    this.profileImageRes = new ProfileImageResponse()
  }
 closeProfile(){
   this.modalService.close('profile');
   this.activeModal.dismiss()
 }
 updateProfile(form: any) {
  if (form.invalid) {
    this.toastr.error("Please Fill all Fields")
    return
  }
  let formdata = {
    id: this.profile.id,
    name: this.Name,
    gender: this.gender,
    age: this.Age,
    msisdn:this.msisdn,
    live: this.profile.live,
    coins: this.profile.coins,
    country: this.profile.country,
    profileImage: this.profileImage,
    loginDateTime: this.profile.loginDateTime,
    logoutDateTime: this.profile.logoutDateTime,
    subscriptionId: this.loginResponse.subModel.id,
  }
  this.store.dispatch(new _fromAction.UpdateProfile(formdata));
  this.store.select<any>(_fromStore.UpdateProfileResponse).subscribe((data: any) => {
    if (data) {
      this.updateRes = data
      if (this.updateRes.statusDescription.statusCode == 200) {
        this.toastr.success(this.updateRes.statusDescription.description);
        this.modalService.close('profile')
        this.showName = false;
        this.showAge = false;
        this.dataShare.name = this.updateRes.profileDetail.name;
        this.profile.name = this.updateRes.profileDetail.name;
        this.profile.age = this.updateRes.profileDetail.age;
        this.profile.gender = this.updateRes.profileDetail.gender;
        this.profile.profileImage = this.updateRes.profileDetail.profileImage
        this.profileImage  = this.profile.profileImage;
       this.questionpageHandle()
        this.loginResponse.subModel.quiz2PlayUserProfileModel.pop();
        this.loginResponse.subModel.quiz2PlayUserProfileModel.push(this.profile);
        EncDecryptUtil.Enc(this.loginResponse,'userdata');
      }
      else {
        this.toastr.error(this.updateRes.statusDescription.description)
      }
    }
  })
}
  questionpageHandle() {
    throw new Error('Method not implemented.');
  }
  isVisible(data: any) {
    return data
  }
}
