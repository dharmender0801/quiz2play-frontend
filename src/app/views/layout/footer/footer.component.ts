import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  locale: string | any
  constructor(private toastr: ToastrService, public translate: TranslateService, private router: Router) {
    let locale = localStorage.getItem('locale');
    if (locale) {
      this.locale = localStorage.getItem('locale')
    }
  }

  ngOnInit(): void {
  }
  coming() {

    if (this.locale == 'ar') {
      this.toastr.info(" قريبا")
    }
    if (this.locale == 'en') {
      this.toastr.info("Coming Soon")
    }
  }

  terms() {
    this.router.navigate(['/terms'])
  }
  privacy() {
    this.router.navigateByUrl('/privacy')
  }
}
