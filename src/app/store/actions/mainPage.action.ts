import { Action } from '@ngrx/store'

export const BANNER = 'to fetch the banner image';
export const BANNER_STATUS = 'to fetch the banner image status ';

export const LOGIN = 'for login ';
export const LOGIN_STATUS = 'for login status';

export const REGISTER = 'for register';
export const REGISTER_STATUS = 'for register status';

export const PINGEN = 'for pin generation';
export const PINGENSTATUS = 'for pin generation Status';
export const PINVERIFY = 'for pin verification';
export const PINVERIFY_STATUS = 'for pin verification status';

export const FETCH_CATAGORY = 'for fetching catagory';
export const FETCH_CATAGORY_STATUS = 'for fetching catagpry Status';

export const FETCH_PRODUCT = 'for Fetching Products ';
export const FETCH_PRODUCT_STATUS = 'for fetching Product Status ';
export const SUBSCHECK = 'for checking the subscription';
export const SUBS_CHECK_STATUS = 'for checking the Subscription Status';

export const UPDATE_PROFILE = 'for update the profile';
export const UPDATE_PROFILE_STATUS = 'for updating  the profile  Status';
export const LOGOUT = 'for logout the profile';
export const LOGOUT_STATUS = 'for logout  the profile  Status';
export const UNSUB = 'for unsub the profile';
export const UNSUB_STATUS = 'for unsub  the profile  Status';

export const PROFILE_IMAGE = 'for fetch the profile Image';
export const PROFILE_IMAGE_STATUS = 'for fetch  the profile Image  Status';

export const BUYCOINS = 'for buying coins';
export const BUYCOINSSTATUS = 'for buying coins Status ';

export const HOWTOPLAY = 'for how to play';
export const HOWTOPLAYSTATUS = 'for how to play status';

export const PLAYBUTTON = ' f9or play button';
export const PLAYBUTTONSTATUS = ' for play button status';

export const BUYCOINSLOGIN = 'for buying coins';
export const BUYCOINSLOGINSTATUS = 'for buying coins Status';

export const FETCHCATEGORYLOGIN = 'for fetching Category';
export const FETCHCATEGORYLOGINSTATUS = 'for fetching Category Status';

export const FETCH_RANKING = 'for fetching rranking';
export const FETCH_RANKINGSTATUS = 'for fetching rranking Status';

export const SEARCCH_CATAGORIES = 'for SEARCHING CATEGORIES';
export const SEARCH_CATAGORIES_STATUS = 'for  SEARCHING CATEGORIES Status';

export const SEARCH_CATAGORIES_LOGIN = 'for SEARCHING CATEGORIES LOGIN';
export const SEARCH_CATAGORIES_LOGIN_STATUS = 'for  SEARCHING CATEGORIES LOGIN Status';

export const FETCH_LANG = 'for Fetching languages';
export const FETCH_LANG_STATUS = 'for Fetching languages Status';

export const FETCH_OPERATOR_PROP = 'for Fetching operatorprop';
export const FETCH_OPERATOR_PROP_STATUS = 'for Fetching operatorprop Status';


export class banner implements Action {
  readonly type = BANNER;

}
export class bannerstatus implements Action {
  readonly type = BANNER_STATUS
  constructor(public payload: any) { }
}

export class Pingen implements Action {
  readonly type = PINGEN;
  constructor(public payload: any) { }
}
export class PingenStatus implements Action {
  readonly type = PINGENSTATUS
  constructor(public payload: any) { }
}
export class Pinverify implements Action {
  readonly type = PINVERIFY;
  constructor(public payload: any) { }
}
export class PinverifyStatus implements Action {
  readonly type = PINVERIFY_STATUS
  constructor(public payload: any) { }
}
export class FetchCatagory implements Action {
  readonly type = FETCH_CATAGORY;

}
export class FetchcatStatus implements Action {
  readonly type = FETCH_CATAGORY_STATUS;
  constructor(public payload: any) { }
}
export class FetchProd implements Action {
  readonly type = FETCH_PRODUCT;
  constructor(public payload: any) { }

}
export class FetchProdStatus implements Action {
  readonly type = FETCH_PRODUCT_STATUS;
  constructor(public payload: any) { }
}
export class CheckSubs implements Action {
  readonly type = SUBSCHECK;
  constructor(public payload: any) { }

}
export class CheckSubsStatus implements Action {
  readonly type = SUBS_CHECK_STATUS;
  constructor(public payload: any) { }
}
export class UpdateProfile implements Action {
  readonly type = UPDATE_PROFILE;
  constructor(public payload: any) { }

}
export class UpdateprofileStatus implements Action {
  readonly type = UPDATE_PROFILE_STATUS;
  constructor(public payload: any) { }
}
export class unSub implements Action {
  readonly type = UNSUB;
  constructor(public payload: any) { }

}
export class unSubStatus implements Action {
  readonly type = UNSUB_STATUS;
  constructor(public payload: any) { }
}
export class logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload: any) { }

}
export class logoutStatus implements Action {
  readonly type = LOGOUT_STATUS;
  constructor(public payload: any) { }
}


export class profileImage implements Action {
  readonly type = PROFILE_IMAGE;


}
export class profileImageStatus implements Action {
  readonly type = PROFILE_IMAGE_STATUS;
  constructor(public payload: any) { }
}



export class buycoins implements Action {
  readonly type = BUYCOINS;


}
export class buycoinsStatus implements Action {
  readonly type = BUYCOINSSTATUS;
  constructor(public payload: any) { }
}

export class howtoplay implements Action {
  readonly type = HOWTOPLAY;
  constructor(public payload: any) { }

}
export class howtoPlayStatus implements Action {
  readonly type = HOWTOPLAYSTATUS;
  constructor(public payload: any) { }
}

export class playButton implements Action {
  readonly type = PLAYBUTTON;
  constructor(public payload: any) { }

}
export class playButtonStatus implements Action {
  readonly type = PLAYBUTTONSTATUS;
  constructor(public payload: any) { }
}
export class buyCoinslogin implements Action {
  readonly type = BUYCOINSLOGIN;

}
export class buyCoinsLoginStatus implements Action {
  readonly type = BUYCOINSLOGINSTATUS;
  constructor(public payload: any) { }
}
export class fetchCategoryWithLogin implements Action {
  readonly type = FETCHCATEGORYLOGIN;

}
export class fetchCategoryWithLoginStatus implements Action {
  readonly type = FETCHCATEGORYLOGINSTATUS;
  constructor(public payload: any) { }
}
export class ranking implements Action {
  readonly type = FETCH_RANKING;
  constructor(public payload: any) { }

}
export class rankingstatus implements Action {
  readonly type = FETCH_RANKINGSTATUS;
  constructor(public payload: any) { }
}
export class fetchLanguage implements Action {
  readonly type = FETCH_LANG;


}
export class fetchLanguageStatus implements Action {
  readonly type = FETCH_LANG_STATUS;
  constructor(public payload: any) { }
}

export class fetchoperatorprop implements Action {
  readonly type = FETCH_OPERATOR_PROP;
  constructor(public payload: any) { }

}
export class fetchoperatorpropStatus implements Action {
  readonly type = FETCH_OPERATOR_PROP_STATUS;
  constructor(public payload: any) { }
}





export type MainAction = banner | bannerstatus | fetchoperatorprop | fetchoperatorpropStatus | Pingen | PingenStatus | Pinverify | PinverifyStatus | FetchCatagory | FetchcatStatus | FetchProd | FetchProdStatus | ranking | rankingstatus
  | CheckSubs | CheckSubsStatus | fetchLanguage | fetchLanguageStatus
  | UpdateProfile | UpdateprofileStatus | unSub | unSubStatus | logout | buyCoinslogin | buyCoinsLoginStatus | fetchCategoryWithLogin | fetchCategoryWithLoginStatus
  | logoutStatus | profileImage | profileImageStatus | buycoins | buycoinsStatus | howtoplay | howtoPlayStatus | playButton | playButtonStatus;