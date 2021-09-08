import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '@core/services/auth/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  form: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    this.buildForm();
  }

  ngOnInit(): void {}

  login(event: Event): void {
    event.preventDefault();
    if (this.form.valid) {
      const user = this.form.value;
      this.authService
        .login(user.email, user.password)
        .then(() => this.router.navigate(['/admin']))
        .catch((err) =>
          Swal.fire({
            icon: 'error',
            text: 'User or password incorrect',
          })
        );
    }
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
    });
  }

  loginAPI(): void {
    this.authService
      .loginRestApi('customer@domain.es', 'customer')
      .subscribe((res) => console.log('Token'));
  }
}
