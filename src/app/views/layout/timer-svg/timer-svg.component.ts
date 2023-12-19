import { Component, Input, OnInit } from '@angular/core';
import { DataShareService } from 'src/app/services/data-share.service';

@Component({
  selector: 'app-timer-svg',
  templateUrl: './timer-svg.component.html',
  styleUrls: ['./timer-svg.component.css']
})
export class TimerSvgComponent implements OnInit {
   @Input() timerColor :number | undefined;
   @Input() reinitialise :boolean | undefined;
  constructor(private data:DataShareService) {
    this.data.reinitialiseTimer.subscribe((data)=>{
      if(data){
        this.ngOnInit();
        this.data.reinitialiseTimer.next(false)
      }
    })
   }

  ngOnInit(): void {
   
  }

}
