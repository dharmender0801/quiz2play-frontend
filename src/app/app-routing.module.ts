import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './services/auth-guard.service';
import { BuycoinsComponent } from './views/buycoins/buycoins.component';
import { CatagoriesMainComponent } from './views/catagories-main/catagories-main.component';
import { CatagoriesComponent } from './views/catagories/catagories.component';
import { HelpComponent } from './views/help/help.component';
import { HomeComponent } from './views/home/home.component';
import { MyscoreComponent } from './views/myscore/myscore.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { QuestionsComponent } from './views/questions/questions.component';
import { SearchComponent } from './views/search/search.component';
import { TermsComponent } from './views/terms/terms.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      { path: '', component: CatagoriesComponent },
      { path: 'buycoin', component: BuycoinsComponent },
      { path: 'help', component: HelpComponent },
      { path: 'myscore', component: MyscoreComponent },

    ],
  },
  {
    path: 'categories/level',
    component: CatagoriesMainComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'categories/ques',
    component: QuestionsComponent,
    canActivate: [AuthGuard],
  },
  { path: 'search', component: SearchComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'privacy', component: PrivacyComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
