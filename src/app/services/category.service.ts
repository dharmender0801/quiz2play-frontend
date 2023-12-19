import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ApiSvcService } from './api-svc.service';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private apiSvc:ApiSvcService) { }
  url = environment.url;

  fetchLevel(form:any){
    return this.apiSvc.post(`${this.url}/category/v1/level-list`,form)
  }
  fetchQues(form:any){
    return this.apiSvc.post(`${this.url}/level/v1/question`,form)
  }
  fetchguidelines(form:any){
    return this.apiSvc.post(`${this.url}/play/v1/guideline`,form)
  }  

 Quesreroll(form:any){
     return this.apiSvc.post(`${this.url}/level/v1/re-roll/question`,form)
   }
   ShowScore(form:any){
     return this.apiSvc.post(`${this.url}/my-score/v1/record`,form)
   }
   Updatelogs(form:any){
     return this.apiSvc.post(`${this.url }/user/v1/logs`,form)
   }
   buylive(form:any){
     return this.apiSvc.post(`${this.url}/lives/v1/purchase`,form)
   }
   
}
