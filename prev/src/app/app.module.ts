import {NgModule} from '@angular/core';
import {BrowserModule, HammerModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HomeComponent} from './home/home.component';
import {MaterialModule} from './modules/shared/material.module';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatCarouselModule} from '@ngbmodule/material-carousel';
import {MatNativeDateModule} from '@angular/material/core';
import {RxReactiveFormsModule} from '@rxweb/reactive-form-validators';
import {FormsModule} from '@angular/forms';

import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {AuthInterceptor} from './modules/shared/facades/auth-interceptor';
import {ErrorInterceptor} from './modules/shared/facades/error-interceptor';
import {SnotifyModule, SnotifyService, ToastDefaults} from 'ng-snotify';
import {NgxUiLoaderModule} from 'ngx-ui-loader';
import {LaddaModule} from 'angular2-ladda';
import {SlickCarouselModule} from 'ngx-slick-carousel';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    FlexLayoutModule,
    MatCarouselModule.forRoot(),
    HammerModule,
    MatNativeDateModule,
    FormsModule,
    RxReactiveFormsModule,
    SnotifyModule,
    NgxUiLoaderModule,
    LaddaModule.forRoot({
      style: 'expand-right',
      spinnerSize: 35,
      spinnerLines: 15,
    }),
    SlickCarouselModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
  ],
  exports: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
