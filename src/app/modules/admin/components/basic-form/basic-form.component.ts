import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  Validators,
  FormBuilder,
} from '@angular/forms';

@Component({
  selector: 'app-basic-form',
  templateUrl: './basic-form.component.html',
  styleUrls: ['./basic-form.component.scss'],
})
export class BasicFormComponent implements OnInit {
  form: FormGroup;

  constructor(private formBuilder: FormBuilder) {}

  ngOnInit(): void {
    this.buildForm();
    this.form.get('date').valueChanges.subscribe((value) => console.log(value));
    // this.form.valueChanges.subscribe((value) => console.log(value));
  }

  private buildForm(): void {
    this.form = this.formBuilder.group({
      fullname: this.formBuilder.group({
        name: [
          null,
          [
            Validators.required,
            Validators.maxLength(10),
            Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}s?){2,4}$/),
          ],
        ],
        lastname: [
          null,
          [
            Validators.required,
            Validators.maxLength(30),
            Validators.pattern(/^([Aa-zA-ZáéíóúÁÉÍÓÚÑñ]{2,}s?){2,4}$/),
          ],
        ],
      }),
      email: [null, [Validators.required, Validators.email]],
      phone: [null, Validators.required],
      color: [''],
      date: [''],
      age: [18, [Validators.required, Validators.min(18), Validators.max(100)]],
      category: [''],
      tag: [''],
      agree: [false, Validators.requiredTrue],
      gender: [''],
      zone: [''],
    });
  }

  get fullname(): AbstractControl {
    return this.form.get('fullname')['controls'];
  }

  get isNameFieldValid(): boolean {
    return this.form.get('phone').touched && this.form.get('phone').valid;
  }
  get IsNameFieldInvalid(): boolean {
    return this.form.get('phone').touched && this.form.get('phone').invalid;
  }

  save(e: Event): void {
    e.preventDefault();
    this.form.markAllAsTouched();
    if (this.form.valid) {
      console.log(this.form.value);
    }
  }
}
