import * as _fromAction from '../actions';


export interface CategoryState {
    fetchlevelStatus: any | undefined;
    fetchquesStatus: any | undefined;
    fetchHelpStatus: any | undefined;
    rollQuesstatus :any | undefined;
    fetchUserlogs :any |undefined;
    fetchScore:any | undefined;
    fetchbuyliveStatus:any  |undefined
}
export const initialState: CategoryState = {
    fetchlevelStatus: null,
    fetchquesStatus: null,
    fetchHelpStatus: null,
    rollQuesstatus:null,
    fetchUserlogs:null,
    fetchScore:null,
    fetchbuyliveStatus:null

}



export function categoryreducer(state = initialState, action: _fromAction.CategoryAction): CategoryState {

    switch (action.type) {
        case _fromAction.FETCH_LEVELS:
            return { ...state };
        case _fromAction.FETCH_LEVELS_STATUS:
            if (action.payload) {
                return { ...state, fetchlevelStatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCHQUES:
            return { ...state };
        case _fromAction.FETCHQUES_STATUS:
            if (action.payload) {
                return { ...state, fetchquesStatus: action.payload };
            }
            return { ...state };
        case _fromAction.FETCHHELP:
            return { ...state };
        case _fromAction.FETCHHELP_STATUS:
            if (action.payload) {
                return { ...state, fetchHelpStatus: action.payload };
            }
            return { ...state };
            case _fromAction.ROLLQUES:
                return { ...state };
            case _fromAction.ROLLQUESSTATUS:
                if (action.payload) {
                    return { ...state, rollQuesstatus: action.payload };
                }
                return { ...state };

                case _fromAction.USERLOGS:
                    return { ...state };
                case _fromAction.USERLOGSSTATUS:
                    if (action.payload) {
                        return { ...state, fetchUserlogs: action.payload };
                    }
                    return { ...state };
                    case _fromAction.SCORESHOW:
                        return { ...state };
                    case _fromAction.SCORESHOW_STATUS:
                        if (action.payload) {
                            return { ...state, fetchScore: action.payload };
                        }
                        return { ...state };
                        case _fromAction.BUYLIVES:
                            return { ...state };
                        case _fromAction.BUYLIVESSTATUS:
                            if (action.payload) {
                                return { ...state, fetchbuyliveStatus: action.payload };
                            }
                            return { ...state };
    
                        


    }

    return { ...state }
}


export const fetchlevelresponse = (state: CategoryState) => state.fetchlevelStatus;
export const fetchquesresponse = (state: CategoryState) => state.fetchquesStatus;
export const fetchhelpresponse = (state: CategoryState) => state.fetchHelpStatus;
export const fetchUserresponse  = (state: CategoryState) => state.fetchUserlogs;
export const fetchScoreresponse  = (state: CategoryState) => state.fetchScore;
export const fetchrerollresponse = (state:CategoryState)=>state.rollQuesstatus;
export const fetchbuyliveStatus = (state:CategoryState)=>state.fetchbuyliveStatus;

