import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";

import { switchMap, map, catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

import { Router } from "@angular/router";

import * as _fromAction from '../actions';
import { CategoryService } from "src/app/services/category.service";
import { HomepageService } from "src/app/services/homepage.service";
import { ToastrService } from "ngx-toastr";
import { NgxSpinnerService } from "ngx-spinner";




@Injectable()

export class CategoriesEffect{
 constructor(private service:CategoryService,private route:Router,private spinner:NgxSpinnerService,private toastr:ToastrService, private action$: Actions,  ){}
 


 showStatusResponse(data:any) {
    if (data.statusDescription.statusCode == 200) {
        this.toastr.success(data.statusDescription.description);
    } else {
        this.toastr.error(data.statusDescription.description);
    }
}
logout(data:any){
    if(data.statusDescription.statusCode ==400){
        localStorage.clear();
        window.location.href="";
           this.route.navigate([''])
    }
   }



@Effect() FetchLevel$ = this.action$.pipe(ofType(_fromAction.FETCH_LEVELS),
switchMap((action: _fromAction.fetchlevels) => {
       //spinner show
       this.spinner.show()
    return this.service.fetchLevel(action.payload).pipe(map((data:any )=> {
        this.spinner.hide()
            //spinner hide
            this.logout(data)
        
            return new _fromAction.fetchlevelStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.fetchlevelStatus(null))))
}),
)
@Effect() FetchQues$ = this.action$.pipe(ofType(_fromAction.FETCHQUES),
switchMap((action: _fromAction.fetchQues) => {
       //spinner show
       this.spinner.show()
    return this.service.fetchQues(action.payload).pipe(map((data:any )=> {
        this.spinner.hide()
        this.logout(data)
        
            //spinner hide
        
        
            return new _fromAction.fetchQuesStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.fetchQuesStatus(null))))
}),
)
@Effect() FetchHelp$ = this.action$.pipe(ofType(_fromAction.FETCHHELP),
switchMap((action: _fromAction.fetchhelp) => {
       //spinner show
       this.spinner.show()
    return this.service.fetchguidelines(action.payload).pipe(map((data:any )=> {
        this.spinner.hide()
        this.logout(data)
        
            //spinner hide
        
        
            return new _fromAction.fetchhelpStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.fetchhelpStatus(null))))
}),
)
@Effect() ShowScore$ = this.action$.pipe(ofType(_fromAction.SCORESHOW),
switchMap((action: _fromAction.showScore ) => {
       //spinner show
       this.spinner.show()
    return this.service.ShowScore(action.payload).pipe(map((data:any )=> {
        this.spinner.hide()
        this.logout(data)
        
            //spinner hide
        
        
            return new _fromAction.showScoreStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.showScoreStatus(null))))
}),
)
@Effect() RollQues$ = this.action$.pipe(ofType(_fromAction.ROLLQUES),
switchMap((action: _fromAction.rollQues ) => {
       //spinner show
       this.spinner.show()
    return this.service.Quesreroll(action.payload).pipe(map((data:any )=> {
        this.spinner.hide()
        this.logout(data)
        
            //spinner hide
        
        
            return new _fromAction.rollQuesStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.rollQuesStatus(null))))
}),
)
@Effect() UpdateUserLogs$ = this.action$.pipe(ofType(_fromAction.USERLOGS),
switchMap((action: _fromAction.updateLogs ) => {
      
    return this.service.Updatelogs(action.payload).pipe(map((data:any )=> {
        
        this.logout(data)

            return new _fromAction.updateLogsStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.updateLogsStatus(null))))
}),
)
@Effect() buylive$ = this.action$.pipe(ofType(_fromAction.BUYLIVES),
switchMap((action: _fromAction.buyLives ) => {
       //spinner show
       this.spinner.show()
    return this.service.buylive(action.payload).pipe(map((data:any )=> {
        this.spinner.hide()
            //spinner hide
            this.logout(data)
        
        
            return new _fromAction.buylivesStatus(data);


    }))
        .pipe(catchError(() => of(new _fromAction.buylivesStatus(null))))
}),
)
}