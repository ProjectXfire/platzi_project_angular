import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CustomValidators } from '../../../../utils/validators';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ProductsService } from '@core/services/products/products.service';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@model/app.category.model';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.scss'],
})
export class ProductFormComponent implements OnInit {
  addressForm = this.fb.group({
    id: [''],
    image: [''],
    name: [null, Validators.required],
    price: [null, [Validators.required, CustomValidators.isValidPrice]],
    description: [null, [Validators.required, Validators.minLength(10)]],
    category_id: [null, Validators.required],
    stock: [10, Validators.required],
  });

  imageURL$: Observable<string>;
  categories$: Observable<Category[]>;
  file: any;

  constructor(
    private fb: FormBuilder,
    private productsService: ProductsService,
    private categoryService: CategoryService,
    private router: Router,
    private storage: AngularFireStorage
  ) {}

  uploadFile(event: any): void {
    const file = event.target.files[0];
    const fileName = event.target.files[0].name;
    const dir = `images/${fileName}`;
    const fileRef = this.storage.ref(dir);
    const task = this.storage.upload(dir, file);
    console.log(URL.createObjectURL(event.target.files[0]));
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          this.imageURL$ = fileRef.getDownloadURL();
          this.imageURL$.subscribe((url) => {
            this.addressForm.get('image').setValue(url);
          });
        })
      )
      .subscribe();
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    console.log(this.addressForm.value);
    if (this.addressForm.valid) {
      const id = Math.floor(Math.random() * 1000);
      this.addressForm.value.id = id.toString();
      this.productsService
        .createProduct(this.addressForm.value)
        .subscribe(() => {
          this.router.navigate(['/admin/list']);
        });
    } else {
      this.addressForm.markAllAsTouched();
    }
  }

  ngOnInit(): void {
    this.getCategories();
  }

  private getCategories(): void {
    this.categories$ = this.categoryService.getAll();
  }
}
