import {  Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';
import { ModalService } from 'src/app/_modal';
@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})

export class ModalComponent implements OnInit {
  @Input( ) levelName : string | any;
  @Input() Start :boolean | any
  
   

  constructor(private modalService:ModalService,public data:DataShareService) { }
   
  ngOnInit(): void {
   
  }
  finishLoginTimer(){

  }
  handleEvent(data){

  }
  closeModal(id){
    this.modalService.close(id)

  }
 
}
