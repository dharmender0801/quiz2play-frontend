import * as _fromAction from '../actions';

export interface MainPageState {
    bannerstatus: any | undefined,
    pingenstatus: any | undefined,
    pinverifystatus: any | undefined,
    fetchCatagoryStatus: any | undefined,
    fetchProductStatus: any | undefined,
    checkSubStatus: any | undefined,
    updateprofilestatus: any | undefined,
    unsubStatus: any | undefined,
    logoutStatus: any | undefined,
    profileImageStatus: any | undefined,
    buycoinsStatus: any | undefined,
    howtoPlayStatus: any | undefined,
    playButtonStatus: any | undefined,
    BuyCoinLoginStatus: any | undefined,
    fetchCategoryloginStatus: any | undefined,
    fetchRankingStatus: any | undefined,
    searchCategoriesStatus: any | undefined,
    searchCatelogin: any | undefined,
    fetchLangStatus: any | undefined,
    fetchOperatorProp: any | undefined
}
export const initialState: MainPageState = {
    bannerstatus: null,
    pingenstatus: null,
    pinverifystatus: null,
    fetchCatagoryStatus: null,
    fetchProductStatus: null,
    checkSubStatus: null,
    updateprofilestatus: null,
    unsubStatus: null,
    logoutStatus: null,
    profileImageStatus: null,
    buycoinsStatus: null,
    howtoPlayStatus: null,
    playButtonStatus: null,
    BuyCoinLoginStatus: null,
    fetchRankingStatus: null,
    fetchCategoryloginStatus: null,
    searchCategoriesStatus: null,
    searchCatelogin: null,
    fetchLangStatus: null,
    fetchOperatorProp: null

}

export function mainReducer(state = initialState, action: _fromAction.MainAction): MainPageState {

    switch (action.type) {
        case _fromAction.BANNER:
            return { ...state };
        case _fromAction.BANNER_STATUS:
            if (action.payload) {
                return { ...state, bannerstatus: action.payload };
            }
            return { ...state };
        case _fromAction.PINGEN:
            return { ...state };
        case _fromAction.PINGENSTATUS:
            if (action.payload) {
                return { ...state, pingenstatus: action.payload };
            }
            return { ...state };
        case _fromAction.PINVERIFY:
            return { ...state };
        case _fromAction.PINVERIFY_STATUS:
            if (action.payload) {
                return { ...state, pinverifystatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCH_CATAGORY:
            return { ...state };
        case _fromAction.FETCH_CATAGORY_STATUS:
            if (action.payload) {
                return { ...state, fetchCatagoryStatus: action.payload };
            }
            return { ...state };


        case _fromAction.FETCH_PRODUCT:
            return { ...state };
        case _fromAction.FETCH_PRODUCT_STATUS:
            if (action.payload) {
                return { ...state, fetchProductStatus: action.payload };
            }
            return { ...state };
        case _fromAction.SUBSCHECK:
            return { ...state };
        case _fromAction.SUBS_CHECK_STATUS:
            if (action.payload) {
                return { ...state, checkSubStatus: action.payload };
            }
            return { ...state };
        case _fromAction.UPDATE_PROFILE:
            return { ...state };
        case _fromAction.UPDATE_PROFILE_STATUS:
            if (action.payload) {
                return { ...state, updateprofilestatus: action.payload };
            }
            return { ...state };
        case _fromAction.UNSUB:
            return { ...state };
        case _fromAction.UNSUB_STATUS:
            if (action.payload) {
                return { ...state, unsubStatus: action.payload };
            }
            return { ...state };
        case _fromAction.LOGOUT:
            return { ...state };
        case _fromAction.LOGOUT_STATUS:
            if (action.payload) {
                return { ...state, logoutStatus: action.payload };
            }
            return { ...state };
        case _fromAction.PROFILE_IMAGE:
            return { ...state };
        case _fromAction.PROFILE_IMAGE_STATUS:
            if (action.payload) {
                return { ...state, profileImageStatus: action.payload };
            }
            return { ...state };

        case _fromAction.BUYCOINS:
            return { ...state };
        case _fromAction.BUYCOINSSTATUS:
            if (action.payload) {
                return { ...state, buycoinsStatus: action.payload };
            }
            return { ...state };
        case _fromAction.HOWTOPLAY:
            return { ...state };
        case _fromAction.HOWTOPLAYSTATUS:
            if (action.payload) {
                return { ...state, howtoPlayStatus: action.payload };
            }
            return { ...state };
        case _fromAction.PLAYBUTTON:
            return { ...state };
        case _fromAction.PLAYBUTTONSTATUS:
            if (action.payload) {
                return { ...state, playButtonStatus: action.payload };
            }
            return { ...state };
        case _fromAction.BUYCOINSLOGIN:
            return { ...state };
        case _fromAction.BUYCOINSLOGINSTATUS:
            if (action.payload) {
                return { ...state, BuyCoinLoginStatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCHCATEGORYLOGIN:
            return { ...state };
        case _fromAction.FETCHCATEGORYLOGINSTATUS:
            if (action.payload) {
                return { ...state, fetchCategoryloginStatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCH_RANKING:
            return { ...state };
        case _fromAction.FETCH_RANKINGSTATUS:
            if (action.payload) {
                return { ...state, fetchRankingStatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCH_LANG:
            return { ...state };
        case _fromAction.FETCH_LANG_STATUS:
            if (action.payload) {
                return { ...state, fetchLangStatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCH_OPERATOR_PROP:
            return { ...state };
        case _fromAction.FETCH_OPERATOR_PROP_STATUS:
            if (action.payload) {
                return { ...state, fetchOperatorProp: action.payload };
            }
            return { ...state };



    }

    return { ...state }
}

export const bannerresponse = (state: MainPageState) => state.bannerstatus;
export const pingenresponse = (state: MainPageState) => state.pingenstatus;
export const pinverresponse = (state: MainPageState) => state.pinverifystatus;
export const fetchcatagoryresponse = (state: MainPageState) => state.fetchCatagoryStatus;
export const fetchproductresponse = (state: MainPageState) => state.fetchProductStatus;
export const checksubresponse = (state: MainPageState) => state.checkSubStatus;
export const updateprofileresponse = (state: MainPageState) => state.updateprofilestatus;
export const logoutresponse = (state: MainPageState) => state.logoutStatus;
export const unsubresponse = (state: MainPageState) => state.unsubStatus;
export const profileImgresponse = (state: MainPageState) => state.profileImageStatus;
export const buyCoinListresponse = (state: MainPageState) => state.buycoinsStatus;
export const howtoPlayresponse = (state: MainPageState) => state.howtoPlayStatus;
export const playButtonresponse = (state: MainPageState) => state.playButtonStatus;
export const buycoinloginresponse = (state: MainPageState) => state.BuyCoinLoginStatus;
export const fetchCategoryLoginresponse = (state: MainPageState) => state.fetchCategoryloginStatus;
export const fetchRankingresponse = (state: MainPageState) => state.fetchRankingStatus;
export const fetchLangresponse = (state: MainPageState) => state.fetchLangStatus;
export const fetchOperatorresponse = (state: MainPageState) => state.fetchOperatorProp;
// export const searchCategorieslogin = (state: MainPageState) => state.searchCatelogin;