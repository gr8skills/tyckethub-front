import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {Router} from '@angular/router';
import {first, tap} from 'rxjs/operators';
import {UiService} from '../../../shared/core/ui.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {BaseService} from '../../../shared/facades/base.service';
import {LocalStorageItems} from '../../../shared/models/enums';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  formSubmitted = false;
  isLoading = false;
  loadingSub = new Subscription();
  returnUrl;
  errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();
  passwordMasked = true;

  loginForm = new FormGroup({
    email: new FormControl('', [
      Validators.required,
      Validators.email
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8),
    ])
  });

  controls = {
    email: this.loginForm.get('email'),
    password: this.loginForm.get('password')
  };

  constructor(private authService: AuthenticationService,
              private router: Router,
              private uiService: UiService,
              private baseService: BaseService) {
    this.returnUrl = this.baseService.getLocalItem(LocalStorageItems.RETURN_URL);
  }

  ngOnInit(): void {
    this.loadingSub = this.uiService.isBusy$.subscribe(busy => this.isLoading = busy);
  }

  clearField(): void {
    this.controls.email?.setValue('');
  }

  toggleVisibility(field: HTMLInputElement): void {
    if (this.passwordMasked) {
      field.type = 'text';
    } else {
      field.type = 'password';
    }
    this.passwordMasked = !this.passwordMasked;
  }

  login(): void {
    if (this.loginForm.invalid) {
      return;
    }
    const returnUrl = this.baseService.getLocalItem(LocalStorageItems.RETURN_URL || 'home');
    const credential = {
      email_phone: this.controls.email?.value,
      password: this.controls.password?.value
    };

    this.uiService.busy = true;
    this.authService.login(credential)
      .pipe(
        first(),
        tap(console.log)
      )
      .subscribe(
        response => {
          this.uiService.busy = false;
          this.authService.handleResponse(response.data);
          this.router.navigateByUrl(returnUrl);
        },
        error1 => {
          const errorMessage = this.baseService.processResponseError(error1);
          this.uiService.busy = false;
          this.errorSubject.next(errorMessage);
          this.uiService.openSnotify(errorMessage, 'Login Error', 'error');
        }
      );

  }

  ngOnDestroy(): void {
    this.loadingSub.unsubscribe();
  }
}
