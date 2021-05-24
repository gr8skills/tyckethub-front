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
import {Angular4PaystackModule} from 'angular4-paystack';
import { FlutterwaveModule } from 'flutterwave-angular-v3';
import { ReactiveFormsModule } from '@angular/forms';

import { SocialLoginModule, SocialAuthServiceConfig } from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';


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
    FlutterwaveModule,
    Angular4PaystackModule.forRoot('pk_test_6d6c5c41906108027355e0570a519d3201772851'),
    ReactiveFormsModule,
    SocialLoginModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
    {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptor, multi: true},
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '789530711633-omaiut5438k749kin8ktk7215f9e515d.apps.googleusercontent.com'
            )
          }
        ]
      } as SocialAuthServiceConfig,
    }
  ],
  exports: [],
  bootstrap: [
    AppComponent,
  ]
})
export class AppModule {
}
