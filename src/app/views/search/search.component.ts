import { Component, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import * as _fromAction from '../../store/actions';
import * as _fromStore from '../../store';
import { NgForm } from '@angular/forms';
import { CatagoryResponse } from 'src/app/response/catagory-response';
import { Store } from '@ngrx/store';
import { EncDecryptUtil } from 'src/app/utils/EncDec-util';
import { categoryreducer } from 'src/app/store/reducers/category.reducer';
import { PinVerResponse } from 'src/app/response/pin-verfy-request';
import { Router } from '@angular/router';
import { ModalService } from 'src/app/_modal';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  searchForm:NgForm;
  catagoryres :CatagoryResponse | undefined;
  loginResponse:PinVerResponse  | undefined;
  searchresponse:CatagoryResponse  |undefined
  public encryptInfo;
  value:string | any
  defaultImage = "assets/images/img-loader2.gif";
  apiValue: string;
  insertedValue: any;
  renderArray:any=[] 
  constructor(public datashare:DataShareService,public store:Store<_fromStore.MainPageState>,public router:Router,private modalService:ModalService) { 
    this.loginResponse  = new PinVerResponse()
    this.catagoryres = new CatagoryResponse()
    let category = localStorage.getItem('categoryres');
   this.encryptInfo= localStorage.getItem('userdata');
    if(   this.encryptInfo != null){
      this.loginResponse = EncDecryptUtil.dec(this.encryptInfo)
    }
    if(category !=null){
      this.catagoryres = EncDecryptUtil.dec(category)
      this.catagoryres.categoryList.forEach(data=>{
        this.renderArray.push(data)
      })
    }
  }

  ngOnInit(): void {
   this.searchresponse = new CatagoryResponse()
    // this.fetchCatagories();0
 
  }
  home(){
    this.router.navigate(['/'])
  }
  isVisible(value: any) {

    return eval(value);
  }

  search(data:string | any){

    if(this.value!="" && data!= undefined ){
      this.renderArray=[];
      this.insertedValue=this.value?.toString();
      if(this.renderArray.length !=null){
        this.catagoryres.categoryList.forEach((element)=>{
          this.apiValue = element.pageName.toUpperCase();
          
          if(this.apiValue !=null && this.insertedValue!=null){
          
           this.insertedValue = this.insertedValue.toUpperCase()
           if(this.apiValue.includes(this.insertedValue)){
             this.renderArray.push(element);
             return
           }
          }
       
         })
         this.renderArray=[...new Set(this.renderArray)];
      }
  
    }
    else{
      this.renderArray=[];
      if(this.renderArray.length !=null){
        this.catagoryres.categoryList.forEach((element)=>{
          this.renderArray.push(element)
        })
      }
    
      }
   
   
 
  }

  fetchCatagories() {
    if(this.encryptInfo==null){
      this.store.dispatch(new _fromAction.FetchCatagory());
      this.store.select<any>(_fromStore.fetchCatagoryResponse).subscribe(data => {
        if (data) {
          this.catagoryres = data;
          EncDecryptUtil.Enc(this.catagoryres, 'categoryres')
          if (this.catagoryres.statusDescription.statusCode == 200) {
          }
        }
      })
    }
    else{
      this.store.dispatch(new _fromAction.fetchCategoryWithLogin());
      this.store.select<any>(_fromStore.fetchcategoryLoginResponse).subscribe(data => {
        if (data) {
          this.catagoryres = data;
        
          EncDecryptUtil.Enc(this.catagoryres, 'categoryres')
          if (this.catagoryres.statusDescription.statusCode == 200) {
          }
        }
      }) 
    }

  }
  CatagoryRouting(op: any) {
    if(!op.lockedStatus){
      return
    }
    else{
    this.encryptInfo = localStorage.getItem('userdata');
     if(this.encryptInfo == null){
          this.modalService.open('loginmodal');
     }
     else {
      let catagoryId = op.id;
      EncDecryptUtil.Enc(catagoryId, 'categoryId');
      this.router.navigate(['categories/level'])
     } 
      }  
    }
}
