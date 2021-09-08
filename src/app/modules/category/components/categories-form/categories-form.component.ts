import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormBuilder,
  Validators,
  FormGroup,
  AbstractControl,
} from '@angular/forms';
import { CategoryService } from '@core/services/category/category.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { finalize } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { CustomValidators } from '@utils/validators';
import { Category } from '@model/app.category.model';

@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.scss'],
})
export class CategoriesFormComponent implements OnInit {
  @Input()
  set category(data: Category) {
    if (data) {
      this.form.patchValue(data);
      this.flag = true;
    } else {
      this.flag = false;
    }
  }
  @Input() title: string;
  @Input() action: string;
  @Output() create = new EventEmitter();
  @Output() update = new EventEmitter();

  flag: boolean;
  imageName: string;

  form: FormGroup;
  uploadProgress$: Observable<number>;

  constructor(
    private fb: FormBuilder,
    private afs: AngularFireStorage,
    private categoryService: CategoryService
  ) {
    this.buildForm();
    this.form.patchValue(this.category);
  }

  private buildForm(): void {
    this.form = this.fb.group({
      name: [
        '',
        [Validators.required, Validators.minLength(4)],
        CustomValidators.validateCategory(this.categoryService),
      ],
      image: ['', Validators.required],
    });
  }

  save(e: Event): void {
    if (this.form.valid) {
      if (this.flag) {
        this.update.emit(this.form.value);
      } else {
        this.create.emit(this.form.value);
      }
    } else {
      this.form.markAsTouched();
    }
  }

  uploadFile(e): void {
    console.log(e);
    const image = e.target.files[0];
    this.imageName = e.target.files[0].name;
    const ref = this.afs.ref(this.imageName);
    const task = this.afs.upload(this.imageName, image);
    this.uploadProgress$ = task.percentageChanges();
    task
      .snapshotChanges()
      .pipe(
        finalize(() => {
          const urlImage$ = ref.getDownloadURL();
          urlImage$.subscribe((url) => {
            this.image.setValue(url);
          });
        })
      )
      .subscribe();
  }

  get image(): AbstractControl {
    return this.form.get('image');
  }

  ngOnInit(): void {}
}
