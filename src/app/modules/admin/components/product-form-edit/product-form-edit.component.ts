import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ProductsService } from '@core/services/products/products.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CustomValidators } from '../../../../utils/validators';
import { Observable } from 'rxjs';
import { Category } from '@model/app.category.model';
import { CategoryService } from '@core/services/category/category.service';

@Component({
  selector: 'app-product-form-edit',
  templateUrl: './product-form-edit.component.html',
  styleUrls: ['./product-form-edit.component.scss'],
})
export class ProductFormEditComponent implements OnInit {
  categories$: Observable<Category[]>;
  states = [
    { name: 'Arizona', abbrev: 'AZ' },
    { name: 'California', abbrev: 'CA' },
    { name: 'Colorado', abbrev: 'CO' },
    { name: 'New York', abbrev: 'NY' },
    { name: 'Pennsylvania', abbrev: 'PA' },
  ];

  addressForm = this.fb.group({
    _id: [''],
    image: [''],
    name: [null, Validators.required],
    price: [null, [Validators.required, CustomValidators.isValidPrice]],
    description: [null, Validators.required],
    category_id: [null, Validators.required],
    state: [null, Validators.required],
  });

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.fetchData();
    this.getCategories();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    if (this.addressForm.valid) {
      console.log(this.addressForm.value);
      /*       this.productsService
        .updateProduct(this.addressForm.value.id, this.addressForm.value)
        .subscribe(() => this.router.navigate(['/admin/list'])); */
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  fetchData(): void {
    this.route.params.subscribe((param: Params) => {
      const id = param.id;
      this.productsService.getProduct(id).subscribe((data) => {
        this.addressForm.patchValue({
          ...data,
          state: this.states[2],
        });
      });
    });
  }

  private getCategories(): void {
    this.categories$ = this.categoryService.getAll();
  }
}
