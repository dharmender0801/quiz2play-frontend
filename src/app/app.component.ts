import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
// import { Router, } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { DataShareService } from './services/data-share.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'quiz2play';
  currentRoute: string;
  routestatus: any;
  constructor(private data: DataShareService, private translate: TranslateService, private router: Router) {
    //translate.setDefaultLang('en');
    router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.currentRoute = event.url;
        if (this.currentRoute == '/categories/ques') {
          this.routestatus = false
        }
        else {
          this.routestatus = true
        }

      }

    });
  }

  onActivate(event: any) {
    let url = window.location.href;
    let index = url.lastIndexOf('/');
    index = index + 1
    let route = url.slice(index)
    this.data.questionurl = route;


  }



}
