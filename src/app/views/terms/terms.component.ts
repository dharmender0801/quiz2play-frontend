import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-terms',
  templateUrl: './terms.component.html',
  styleUrls: ['./terms.component.css']
})
export class TermsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  home() {
    this.router.navigate(['/'])
  }
  languageswitch() {

    if (localStorage.getItem('locale') == 'en') {
      // console.log("english")
      return 1
    }
    else if (localStorage.getItem('locale') == 'ar') {
      return 2
    }
    return 3

  }

}
