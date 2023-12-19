import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from "@angular/router";

import * as _fromAction from '../actions';
import { HomepageService } from "src/app/services/homepage.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";


@Injectable()
export class MainPageEffect {
    constructor(private action$: Actions, private route: Router, private home: HomepageService, private toastrService: ToastrService, private spinner: NgxSpinnerService) { }

    showResponse(data: any) {
        if (data.statusDescription.status == 200) {

        } else {

        }
    }
    logout(data: any) {
        if (data.statusDescription.statusCode == 400) {
            localStorage.clear();
            window.location.href = ""
            this.route.navigate([''])
        }
    }



    showStatusResponse(data: any) {
        if (data.statusDescription.statusCode == 200) {
            this.toastrService.success(data.statusDescription.description);
        }
        else if (data.statusDescription.statusCode == 400) {
            localStorage.clear();
            window.location.href = "";

            this.toastrService.error(data.statusDescription.description)
        }
        else {
            this.toastrService.error(data.statusDescription.description);
        }
    }

    @Effect() BannerGet$ = this.action$.pipe(ofType(_fromAction.BANNER),
        switchMap((action: _fromAction.banner) => {
            //spinner show
            this.spinner.show()
            return this.home.getbanner().pipe(map((data: any) => {
                this.spinner.hide()
                //spinner hide
                this.logout(data)


                return new _fromAction.bannerstatus(data);


            }))
                .pipe(catchError(() => of(new _fromAction.bannerstatus(null))))
        }),



    )
    @Effect() Pingen$ = this.action$.pipe(ofType(_fromAction.PINGEN),
        switchMap((action: _fromAction.Pingen) => {
            //spinner show
            this.spinner.show()
            return this.home.pinGen(action.payload).pipe(map((data: any) => {
                this.spinner.hide()
                this.showStatusResponse(data);
                this.logout(data)
                //spinner hide


                return new _fromAction.PingenStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.PingenStatus(null))))
        })
    )
    @Effect() Pinverify$ = this.action$.pipe(ofType(_fromAction.PINVERIFY),
        switchMap((action: _fromAction.Pinverify) => {
            //spinner show
            this.spinner.show()
            return this.home.pinVerify(action.payload).pipe(map((data: any) => {
                this.spinner.hide()

                this.showStatusResponse(data);
                this.logout(data)
                //spinner hide



                return new _fromAction.PinverifyStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.PinverifyStatus(null))))
        })
    )
    @Effect() FetchCatagory$ = this.action$.pipe(ofType(_fromAction.FETCH_CATAGORY),
        switchMap((action: _fromAction.FetchCatagory) => {
            //spinner show
            this.spinner.show()
            return this.home.fetchCatagory().pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                //spinner hide


                return new _fromAction.FetchcatStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.FetchcatStatus(null))))
        })
    )
    @Effect() FetchProducts$ = this.action$.pipe(ofType(_fromAction.FETCH_PRODUCT),
        switchMap((action: _fromAction.FetchProd) => {
            //spinner show
            this.spinner.show()
            return this.home.fetchProduct(action.payload).pipe(map((data: any) => {
                this.spinner.hide()
                //spinner hide
                this.logout(data)



                return new _fromAction.FetchProdStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.FetchProdStatus(null))))
        })
    )
    @Effect() updateProfile$ = this.action$.pipe(ofType(_fromAction.UPDATE_PROFILE),
        switchMap((action: _fromAction.UpdateProfile) => {
            //spinner show
            return this.home.updateProfile(action.payload).pipe(map((data: any) => {

                //spinner hide
                this.logout(data)

                return new _fromAction.UpdateprofileStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.UpdateprofileStatus(null))))
        })
    )
    @Effect() CheckSub$ = this.action$.pipe(ofType(_fromAction.SUBSCHECK),
        switchMap((action: _fromAction.CheckSubs) => {
            //spinner show
            return this.home.fetchSubs(action.payload).pipe(map((data: any) => {
                this.showResponse(data);
                //spinner hide
                this.logout(data)

                return new _fromAction.CheckSubsStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.CheckSubsStatus(null))))
        })
    )
    @Effect() logout$ = this.action$.pipe(ofType(_fromAction.LOGOUT),
        switchMap((action: _fromAction.logout) => {
            //spinner show
            return this.home.logoutApi(action.payload).pipe(map((data: any) => {
                this.showResponse(data);
                this.logout(data)
                //spinner hide


                return new _fromAction.logoutStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.logoutStatus(null))))
        })
    )
    @Effect() unsub$ = this.action$.pipe(ofType(_fromAction.UNSUB),
        switchMap((action: _fromAction.unSub) => {
            //spinner show
            return this.home.unsubApi(action.payload).pipe(map((data: any) => {
                this.showStatusResponse(data)
                //spinner hide
                this.logout(data)

                return new _fromAction.unSubStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.unSubStatus(null))))
        })
    )
    @Effect() ProfileImage$ = this.action$.pipe(ofType(_fromAction.PROFILE_IMAGE),
        switchMap((action: _fromAction.profileImage) => {
            this.spinner.show()
            return this.home.profileimage().pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.profileImageStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.profileImageStatus(null))))
        })
    )


    @Effect() Buycoins$ = this.action$.pipe(ofType(_fromAction.BUYCOINS),
        switchMap((action: _fromAction.buycoins) => {
            this.spinner.show()
            return this.home.buycoins().pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.buycoinsStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.buycoinsStatus(null))))
        })
    )
    @Effect() HowtoPlay$ = this.action$.pipe(ofType(_fromAction.HOWTOPLAY),
        switchMap((action: _fromAction.howtoplay) => {
            this.spinner.show()
            return this.home.howtoPlay(action.payload).pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.howtoPlayStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.howtoPlayStatus(null))))
        })
    )
    @Effect() Playbutton$ = this.action$.pipe(ofType(_fromAction.PLAYBUTTON),
        switchMap((action: _fromAction.playButton) => {
            this.spinner.show()
            return this.home.PlayButton(action.payload).pipe(map((data: any) => {
                this.spinner.hide()
                return new _fromAction.playButtonStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.playButtonStatus(null))))
        })
    )
    @Effect() BuycoinLogin$ = this.action$.pipe(ofType(_fromAction.BUYCOINSLOGIN),
        switchMap((action: _fromAction.buyCoinslogin) => {
            this.spinner.show()
            return this.home.BuycoinsWithLogin().pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.buyCoinsLoginStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.buyCoinsLoginStatus(null))))
        })
    )
    @Effect() fetchCategorywithlogin$ = this.action$.pipe(ofType(_fromAction.FETCHCATEGORYLOGIN),
        switchMap((action: _fromAction.fetchCategoryWithLogin) => {
            this.spinner.show()
            return this.home.fetchCatagoryWithlogin().pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.fetchCategoryWithLoginStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.fetchCategoryWithLoginStatus(null))))
        })
    )
    @Effect() rankinglist$ = this.action$.pipe(ofType(_fromAction.FETCH_RANKING),
        switchMap((action: _fromAction.ranking) => {
            this.spinner.show()
            return this.home.fetchRanking(action.payload).pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.rankingstatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.rankingstatus(null))))
        })
    )
    @Effect() FetchlanguageList$ = this.action$.pipe(ofType(_fromAction.FETCH_LANG),
        switchMap((action: _fromAction.fetchLanguage) => {
            this.spinner.show()
            return this.home.fetchLanguages().pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.fetchLanguageStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.fetchLanguageStatus(null))))
        })
    )
    @Effect() fetchOperatorProp$ = this.action$.pipe(ofType(_fromAction.FETCH_OPERATOR_PROP),
        switchMap((action: _fromAction.fetchoperatorprop) => {
            this.spinner.show()
            return this.home.fetchoperatorprop(action.payload).pipe(map((data: any) => {
                this.spinner.hide()
                this.logout(data)
                return new _fromAction.fetchoperatorpropStatus(data);

            }))
                .pipe(catchError(() => of(new _fromAction.fetchoperatorpropStatus(null))))
        })
    )





}