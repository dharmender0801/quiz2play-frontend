import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import * as _fromAction from '../../../store/actions/index'
import { Store } from '@ngrx/store';
import { OwlOptions } from 'ngx-owl-carousel-o';
import * as _fromStore from '../../../store/index';
import { BannerRs } from 'src/app/response/banner-response';
import { ApiSvcService } from 'src/app/services/api-svc.service';
import { HomepageService } from 'src/app/services/homepage.service';
import { ModalService } from 'src/app/_modal';
import { DataShareService } from 'src/app/services/data-share.service';
import { environment } from 'src/environments/environment';
import { playButtonResponse } from 'src/app/response/play-button-response';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  customOptions: OwlOptions = {
    loop: true,
    items: 1,
    mouseDrag: true,
    lazyLoad: true,
    touchDrag: false,
    pullDrag: true,
    margin: 10,
    autoplay: true,
    autoplayHoverPause: true,
    dots: true,
    autoHeight: true,
    autoplayTimeout: 3000,
    center: false,
    responsive: {
      0: {
        items: 1
      }
    },
  }

  bannerres: BannerRs | any
  heart: number = 3;
  coins: number = 100;
  locale: string = "";
  starShow: boolean = false;
  playbuttonRes: playButtonResponse | undefined

  constructor(private apiSvc: ApiSvcService, private route: Router, public translate: TranslateService, private home: HomepageService, private toastr: ToastrService, private store: Store<_fromStore.MainPageState>, public modal: ModalService, public dataShare: DataShareService, private router: Router) {
    this.locale = localStorage.getItem('locale');

    console.log(this.router.url)
    this.ShowStar()
  }




  ShowStar() {
    if (this.router.url === '/categories/ques') {
      this.starShow = true
    }
    else {
      this.starShow = false
    }
  }

  ngOnInit() {
    this.bannerres = new BannerRs();
    this.playbuttonRes = new playButtonResponse()
    this.bannerFetch();
  }
  imgevent(e: any) {
    return
  }
  bannerFetch() {
    let formdata = {
      id: 1,
      url: "http://localhost:3000/banner1.png"
    }
    this.bannerres.bannerList?.push(formdata)
    this.store.dispatch(new _fromAction.banner());
    this.store.select<BannerRs>(_fromStore.bannerResponse).subscribe(data => {
      if (data) {
        this.bannerres = data;
      }
    })

  }
  openModal() {
    if (this.dataShare.loggedIn == true) {
      let formdata = {
        serviceId: environment.serviceId,
        portalId: environment.portalId,
        userProfileId: this.dataShare.userProfileId
      }
      this.store.dispatch(new _fromAction.playButton(formdata));
      this.store.select<playButtonResponse>(_fromStore.playButtonResponse).subscribe((data) => {
        if (data) {
          this.playbuttonRes = data;
          if (this.playbuttonRes.statusDescription.statusCode == 200) {
            let categoryId = EncDecryptUtil.Enc(this.playbuttonRes.categoryId, 'categoryId');
            this.route.navigate(['categories/level'])
          }
        }
      })
    }
    else {
      this.modal.open('loginmodal');

    }

  }
}
