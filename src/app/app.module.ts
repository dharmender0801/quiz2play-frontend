import { CUSTOM_ELEMENTS_SCHEMA,NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './views/home/home.component';
import { HeaderComponent } from './views/layout/header/header.component';
import { FooterComponent } from './views/layout/footer/footer.component';
import { BannerComponent } from './views/layout/banner/banner.component';
import { PageNotFoundComponent } from './views/layout/page-not-found/page-not-found.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClient, HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import {ModalModule} from './_modal';
import { ModalComponent } from './views/layout/modals/modal/modal.component';
import { NgImageSliderModule } from 'ng-image-slider';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthInterceptorService } from './services/auth-interceptor.service';
import { CatagoriesComponent } from './views/catagories/catagories.component';
import { MyscoreComponent } from './views/myscore/myscore.component';
import { HelpComponent } from './views/help/help.component';
import { BuycoinsComponent } from './views/buycoins/buycoins.component';
import { NgxScrollTopModule } from 'ngx-scrolltop';
import { NgxWheelModule } from 'ngx-wheel';
import { LazyLoadImageModule, } from 'ng-lazyload-image'; 
import { QuestionsComponent } from './views/questions/questions.component';
import { ToastrModule } from 'ngx-toastr';
import { Store, StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { maineffect, reducers ,CategoriesEffect,categoryreducers, categoryeffect} from './store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { BarCompComponent } from './views/layout/bar-comp/bar-comp/bar-comp.component';
import { CountdownModule } from 'ngx-countdown';
import { NgxSpinner, NgxSpinnerModule } from 'ngx-spinner';
import { CatagoriesMainComponent } from './views/catagories-main/catagories-main.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { TimerSvgComponent } from './views/layout/timer-svg/timer-svg.component';
import {ProgressBarModule} from "angular-progress-bar";
import { BackButtonDisableModule } from 'angular-disable-browser-back-button';
import { SearchComponent } from './views/search/search.component';
import {TranslateModule} from '@ngx-translate/core';
import { TranslateLoader} from '@ngx-translate/core';
import {TranslateHttpLoader} from '@ngx-translate/http-loader';
import * as $ from "jquery";
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { UpdateProfileComponent } from './modals/update-profile/update-profile.component';
import { PrivacyComponent } from './views/privacy/privacy.component';
import { TermsComponent } from './views/terms/terms.component';

// export function HttpLoaderFactory(http: HttpClient) {
//   return new TranslateHttpLoader(http);
// }
export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    FooterComponent,
    BannerComponent,
    PageNotFoundComponent,
    CatagoriesComponent,
    MyscoreComponent,
    HelpComponent,
    BuycoinsComponent,
    ModalComponent,
    QuestionsComponent,
    BarCompComponent,
    CatagoriesMainComponent,
    TimerSvgComponent,
    SearchComponent,

    UpdateProfileComponent,
     PrivacyComponent,
     TermsComponent

   
    
  ],
  imports: [
    NgbModalModule,
    BrowserModule,
    AppRoutingModule,
    NgImageSliderModule,
    ModalModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxScrollTopModule,
    NgxWheelModule,
    BrowserAnimationsModule,
    StoreDevtoolsModule,
    NgxSpinnerModule,
    LazyLoadImageModule,
    CarouselModule,
    ProgressBarModule,
    TranslateModule.forRoot({
      loader: {
            provide: TranslateLoader,
            useFactory: createTranslateLoader,
            deps: [HttpClient]
        }

    }),      
    BackButtonDisableModule.forRoot()
  ,

    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      timeOut:2000,
      positionClass:'toast-top-right'
  }),
  
   CountdownModule,
    StoreModule.forRoot({},
      {
        runtimeChecks: {
          strictActionImmutability: false, // disable it to avoid the error
        }
      }
      ),
    EffectsModule.forRoot([]),
    StoreModule.forFeature('main',reducers),
    //  TranslateModule,
     EffectsModule.forFeature(maineffect),
     StoreModule.forFeature('category',categoryreducers),
     EffectsModule.forFeature(categoryeffect),
  

  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [
        {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
