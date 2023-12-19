import {Action} from '@ngrx/store';




export  const  FETCH_LEVELS= 'to fetch the Levels';
export const  FETCH_LEVELS_STATUS ='to fetch the Levels status ';

export  const  FETCHQUES= 'to fetch the ques';
export const  FETCHQUES_STATUS ='to fetch the ques status ';

export  const  FETCHHELP= 'to fetch the guidelines';
export const  FETCHHELP_STATUS ='to fetch the guidelines status ';

export const ROLLQUES =' for rolling ques';
export const   ROLLQUESSTATUS =' for rolling ques Status';

export const SCORESHOW = ' for showing score to user ';
export const SCORESHOW_STATUS =' for showing score to the user status';

export const USERLOGS = 'for getting logs from the User ';
export const USERLOGSSTATUS = ' for getting Logs from User Status';

export const BUYLIVES= 'for buying lives ';
export const BUYLIVESSTATUS= 'for buying lives status';




export class fetchlevels implements Action {
    readonly type = FETCH_LEVELS;
    constructor(public payload:any){}
 
  }
  export class fetchlevelStatus implements Action{
      readonly type = FETCH_LEVELS_STATUS
      constructor(public payload:any){}
  }
  
export class fetchQues implements Action {
    readonly type = FETCHQUES;
    constructor(public payload:any){}
 
  }
  export class fetchQuesStatus implements Action{
      readonly type = FETCHQUES_STATUS
      constructor(public payload:any){}
  }

  export class fetchhelp implements Action {
    readonly type = FETCHHELP;
    constructor(public payload:any){}
 
  }
  export class fetchhelpStatus implements Action{
      readonly type = FETCHHELP_STATUS
      constructor(public payload:any){}
  }

  export class rollQues implements Action {
    readonly type = ROLLQUES;
    constructor(public payload:any){}
 
  }
  export class rollQuesStatus implements Action{
      readonly type = ROLLQUESSTATUS
      constructor(public payload:any){}
  }
   
  export class showScore implements Action {
    readonly type = SCORESHOW;
    constructor(public payload:any){}
 
  }
  export class showScoreStatus implements Action{
      readonly type = SCORESHOW_STATUS
      constructor(public payload:any){}
  }
  
      
  export class updateLogs implements Action {
    readonly type = USERLOGS;
    constructor(public payload:any){}
 
  }
  export class updateLogsStatus implements Action{
      readonly type = USERLOGSSTATUS
      constructor(public payload:any){}
  }

  export class buyLives implements Action {
    readonly type = BUYLIVES;
    constructor(public payload:any){}
 
  }
  export class buylivesStatus implements Action{
      readonly type = BUYLIVESSTATUS
      constructor(public payload:any){}
  }

  

 export type CategoryAction = fetchlevels |  fetchlevelStatus | fetchQues   | fetchQuesStatus | fetchhelp | fetchhelpStatus 
   | updateLogs | updateLogsStatus | showScore | showScoreStatus | rollQues | rollQuesStatus  | buyLives | buylivesStatus;
 //= banner | bannerstatus ;
