import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { ReactiveFormsModule } from '@angular/forms';

import { CategoryRoutingModule } from './category-routing.module';
import { CategoriesComponent } from './components/categories/categories.component';
import { CategoriesFormComponent } from './components/categories-form/categories-form.component';
import { CategoryContainer } from './containers/category/category.container';

@NgModule({
  declarations: [
    CategoriesComponent,
    CategoriesFormComponent,
    CategoryContainer,
  ],
  imports: [
    CommonModule,
    CategoryRoutingModule,
    MaterialModule,
    ReactiveFormsModule,
  ],
})
export class CategoryModule {}
