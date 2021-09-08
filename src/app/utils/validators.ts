import {
  AbstractControl,
  FormControl,
  FormGroupDirective,
  NgForm,
  ValidationErrors,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { CategoryService } from '@core/services/category/category.service';
import { map } from 'rxjs/operators';

export class CustomValidators {
  static isValidPrice(control: AbstractControl): any {
    const value = control.value;
    if (value > 1000) {
      return {
        priceInvalid: true,
      };
    }
    return null;
  }

  static validPassword(control: AbstractControl): any {
    const value = control.value;
    if (containBlankSpace(value)) {
      return {
        blank_space: true,
      };
    }
    if (!containNumber(value)) {
      return {
        invalid_password: true,
      };
    }
    return null;
  }

  static matchPassword(control: AbstractControl): ValidationErrors | null {
    const password = control.get('password').value;
    const confirmPassword = control.get('confirmPassword').value;
    if (password === confirmPassword) {
      return null;
    }
    return {
      match_invalid: true,
    };
  }

  static validateCategory(service: CategoryService): any {
    return (control: AbstractControl) => {
      const value = control.value;
      return service.availabilityCategory(value).pipe(
        map((res: any) => {
          const isAvailable = res.isAvailable;
          if (!isAvailable) {
            return {
              not_available: true,
            };
          }
          return null;
        })
      );
    };
  }
}

const containBlankSpace = (password: any): boolean => {
  return password.split('').some((char: string) => char === ' ');
};

const containNumber = (password: any): boolean => {
  return password.split('').some((char: string) => isNumber(char) === true);
};

const isNumber = (value: any): boolean => {
  return !isNaN(parseInt(value, 10));
};

export class CrossFieldPasswordConfirmPassword implements ErrorStateMatcher {
  isErrorState(
    control: FormControl | null,
    form: FormGroupDirective | NgForm | null
  ): boolean {
    return control.touched && form.invalid;
  }
}
