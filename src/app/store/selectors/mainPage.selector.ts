import { createSelector } from "@ngrx/store";

import * as _fromReducers from '../reducers';
import * as _fromMainreducer from '../reducers/mainPage.reducer';

export const loginState = createSelector(
  _fromReducers.getMainState,
  (state: _fromReducers.MainPageState) => state.mainInfo
);

export const bannerResponse = createSelector(loginState, _fromMainreducer.bannerresponse);
export const pingenResponse = createSelector(loginState, _fromMainreducer.pingenresponse);
export const pinverResponse = createSelector(loginState, _fromMainreducer.pinverresponse);
export const fetchCatagoryResponse = createSelector(loginState, _fromMainreducer.fetchcatagoryresponse);
export const fetchProductResponse = createSelector(loginState, _fromMainreducer.fetchproductresponse);;
export const checkSubResponse = createSelector(loginState, _fromMainreducer.checksubresponse);
export const UpdateProfileResponse = createSelector(loginState, _fromMainreducer.updateprofileresponse);
export const unsubResponse = createSelector(loginState, _fromMainreducer.unsubresponse);
export const logoutResponse = createSelector(loginState, _fromMainreducer.logoutresponse);
export const profileImgResponse = createSelector(loginState, _fromMainreducer.profileImgresponse);
export const buycoinResponse = createSelector(loginState, _fromMainreducer.buyCoinListresponse);
export const howToPlayResponse = createSelector(loginState, _fromMainreducer.howtoPlayresponse);
export const playButtonResponse = createSelector(loginState, _fromMainreducer.playButtonresponse)
export const buycoinsloginResponse = createSelector(loginState, _fromMainreducer.buycoinloginresponse)
export const fetchcategoryLoginResponse = createSelector(loginState, _fromMainreducer.fetchCategoryLoginresponse)
export const fetchRankingResponse = createSelector(loginState, _fromMainreducer.fetchRankingresponse);
export const fetchLangResponse = createSelector(loginState, _fromMainreducer.fetchLangresponse)
export const fetchOperatorPropResponse = createSelector(loginState, _fromMainreducer.fetchOperatorresponse)
  // export const  searchCateloginRes = createSelector(loginState,_fromMainreducer.searchCategorieslogin)