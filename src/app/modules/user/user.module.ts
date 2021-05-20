import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { UserIndexComponent } from './components/user-index/user-index.component';
import {MaterialModule} from '../shared/material.module';
import { SignInComponent } from './components/sign-in/sign-in.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { ForgotPasswordComponent } from './components/forgot-password/forgot-password.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HeaderAuthComponent } from './components/header-auth/header-auth.component';
import {LaddaModule} from "angular2-ladda";
import { EmailModalComponent } from './components/email-modal/email-modal.component';
import { PhoneModalComponent } from './components/phone-modal/phone-modal.component';

const routes: Routes = [
  {
    path: '',
    component: UserIndexComponent
  },
  {
    path: 'sign-in',
    component: SignInComponent,
  },
  {
    path: 'sign-up',
    component: SignUpComponent
  },
  {
    path: 'forgot-password',
    component: ForgotPasswordComponent,
  }
];

@NgModule({
  declarations: [
    UserIndexComponent,
    SignInComponent,
    ForgotPasswordComponent,
    SignUpComponent,
    HeaderAuthComponent,
    EmailModalComponent,
    PhoneModalComponent,
  ],
  exports: [],
    imports: [
        MaterialModule,
        RouterModule.forChild(routes),
        FormsModule,
        ReactiveFormsModule,
        LaddaModule,
    ]
})

export class UserModule {}
