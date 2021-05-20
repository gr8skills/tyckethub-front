import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {RawUserFormValue, UserDto} from '../../models/user-dto';
import {AuthenticationService} from '../../../shared/facades/authentication.service';
import {Router} from '@angular/router';
import {MustMatch} from '../../../shared/facades/must-match-validator';
import {UserService} from '../../apis/user.service';
import {BehaviorSubject, Subscription} from 'rxjs';
import {UiService} from '../../../shared/core/ui.service';
import {BaseService} from '../../../shared/facades/base.service';
import {LocalStorageItems} from '../../../shared/models/enums';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit, OnDestroy {

  isLoading = false;
  errorSubject = new BehaviorSubject<string>('');
  error$ = this.errorSubject.asObservable();
  loadingSub = new Subscription();
  rolesSub = new Subscription();
  roles: { name: string, id: number }[] = [];
  canSubmitForm = true;
  passwordMasked = true;
  confirmPasswordMasked = true;
  signUpForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [
        Validators.required,
        Validators.email
      ]],
      phone: ['', [
        Validators.required,
        Validators.minLength(11)
      ]],
      password: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      passwordConfirmation: ['', [
        Validators.required,
        Validators.minLength(8)
      ]],
      role: ['', Validators.required]
    },
    {validator: MustMatch('password', 'passwordConfirmation')}
  );

  constructor(private fb: FormBuilder,
              private authService: AuthenticationService,
              private userService: UserService,
              private uiService: UiService,
              private router: Router,
              private baseService: BaseService) {
  }

  controls = {
    firstName: this.signUpForm.get('firstName'),
    lastName: this.signUpForm.get('lastName'),
    email: this.signUpForm.get('email'),
    phone: this.signUpForm.get('phone'),
    password: this.signUpForm.get('password'),
    passwordConfirmation: this.signUpForm.get('passwordConfirmation'),
    role: this.signUpForm.get('role')
  };

  ngOnInit(): void {
    this.rolesSub = this.userService.getRoles().subscribe(payload => {
      this.roles = payload.data;
    });
    this.loadingSub = this.uiService.isBusy$.subscribe(busy => {
      this.isLoading = busy;
    });

  }

  checkPasswords(): boolean {
    return this.controls.password?.value === this.controls.passwordConfirmation?.value;
  }

  signUp(): void {
    if (!this.checkPasswords()) {
      this.canSubmitForm = false;
      this.uiService.openSnotify('Sorry passwords do not match. ', 'Error', 'error');
    }
    if (this.signUpForm.valid && this.canSubmitForm) {
      this.uiService.busy = true;
      const user = new UserDto(this.signUpForm.value as RawUserFormValue);
      const returnUrl = this.baseService.getLocalItem(LocalStorageItems.RETURN_URL) || '/home';
      this.authService.createUser(user).subscribe(data => {
          this.uiService.busy = false;
          this.authService.handleResponse(data.data);
          this.router.navigateByUrl(returnUrl);
        }, error1 => {
          const errorMessage = this.baseService.processResponseError(error1);
          this.uiService.busy = false;
          this.errorSubject.next(errorMessage);
          console.log('Sign up error: ', error1);
          this.uiService.openSnotify(errorMessage, 'Sign up Error', 'error');
        }
      );
    } else {
      this.uiService.openSnotify('Please fill up the necessary field in the form', 'Sign up error', 'error');
    }
  }

  clearField(fieldName: string): void {
    switch (fieldName) {
      case 'firstName':
        this.controls.firstName?.setValue('');
        break;
      case 'lastName':
        this.controls.lastName?.setValue('');
        break;
      case 'email':
        this.controls.email?.setValue('');
        break;
      case 'phone':
        this.controls.phone?.setValue('');
        break;
    }
  }

  toggleVisibility(field: HTMLInputElement, target: number): void {

    switch (target) {
      case 1:
        if (this.passwordMasked) {
          field.type = 'text';
        } else {
          field.type = 'password';
        }
        this.passwordMasked = !this.passwordMasked;
        break;
      case 2:
        if (this.confirmPasswordMasked) {
          field.type = 'text';
        } else {
          field.type = 'password';
        }
        this.confirmPasswordMasked = !this.confirmPasswordMasked;
        break;
    }

  }

  filterRoles(): any {
    return this.roles.filter(role => role.name !== 'admin');
  }

  ngOnDestroy(): void {
    this.rolesSub.unsubscribe();
    this.loadingSub.unsubscribe();
  }
}
