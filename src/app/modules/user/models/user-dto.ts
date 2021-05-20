export class UserDto {
  first_name: string;
  last_name: string;
  phone: string;
  email: string;
  password: string;
  password_confirmation: string;
  role: string;

  constructor(formValue: RawUserFormValue) {
    this.first_name = formValue.firstName;
    this.last_name = formValue.lastName;
    this.phone = formValue.phone;
    this.email = formValue.email;
    this.password = formValue.password;
    this.password_confirmation = formValue.passwordConfirmation;
    this.role = formValue.role;
  }
}

export interface RawUserFormValue {
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  role: string;
}
