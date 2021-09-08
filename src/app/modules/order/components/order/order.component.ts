import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '@model/app.product.model';
import { CartService } from '@core/services/cart/cart.service';
import {
  FormControl,
  FormBuilder,
  Validators,
  FormGroup,
  FormArray,
} from '@angular/forms';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.scss'],
})
export class OrderComponent implements OnInit {
  products$: Observable<Product[]>;
  quantity: FormControl;
  total: FormControl;
  form: FormGroup;

  constructor(
    private cartService: CartService,
    private formBuilder: FormBuilder
  ) {
    this.quantity = new FormControl(0);
    this.total = new FormControl();
    this.products$ = this.cartService.cart$;
    this.buildForm();
  }

  buildForm(): void {
    this.form = this.formBuilder.group({
      name: ['', Validators.required],
      address: this.formBuilder.array([]),
    });
  }

  addAddressField(): void {
    this.addressField.push(this.createAddressField());
  }

  removeAddressField(i: number): void {
    this.addressField.removeAt(i);
  }

  private createAddressField(): FormGroup {
    return this.formBuilder.group({
      zip: ['', Validators.required],
      text: ['', Validators.required],
    });
  }

  get addressField(): FormArray {
    return this.form.get('address') as FormArray;
  }

  plus(price: number): void {
    this.quantity.setValue(this.quantity.value + 1);
  }

  less(price: number): void {
    if (this.quantity.value > 0) {
      this.quantity.setValue(this.quantity.value - 1);
    }
  }

  save(): void {
    console.log(this.form.value);
  }

  ngOnInit(): void {}
}
