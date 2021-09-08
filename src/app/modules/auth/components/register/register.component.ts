import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import {
  CustomValidators,
  CrossFieldPasswordConfirmPassword,
} from '@utils/validators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  form: FormGroup;
  matcher = new CrossFieldPasswordConfirmPassword();

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  private buildForm(): void {
    this.form = this.formBuilder.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(8),
            CustomValidators.validPassword,
          ],
        ],
        confirmPassword: ['', Validators.required],
        type: ['', [Validators.required]],
        companyName: ['', Validators.required],
      },
      {
        validators: [CustomValidators.matchPassword],
      }
    );
    this.type.valueChanges.subscribe((value) => {
      if (value === 'company') {
        this.companyName.setValidators([Validators.required]);
      } else {
        this.companyName.setValidators(null);
      }
      this.companyName.updateValueAndValidity();
    });
  }

  get type(): AbstractControl {
    return this.form.get('type');
  }

  get companyName(): AbstractControl {
    return this.form.get('companyName');
  }

  register(event: Event): void {
    event.preventDefault();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      const user = this.form.value;
      console.log(user);
      this.authService
        .createUser(user.email, user.password)
        .then(() => this.router.navigate(['/auth/login']))
        .catch((err) => console.log(err));
    }
  }

  ngOnInit(): void {}
}
