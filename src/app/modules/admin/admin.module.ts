import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminRoutingModule } from './admin-routing.module';
import { ProductFormComponent } from './components/product-form/product-form.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '@shared/shared.module';

// Material design
import { MaterialModule } from '../material/material.module';
// Components
import { NavComponent } from './components/nav/nav.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { LayoutModule } from '@angular/cdk/layout';
import { ProductFormEditComponent } from './components/product-form-edit/product-form-edit.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';

@NgModule({
  declarations: [
    ProductFormComponent,
    NavComponent,
    ProductListComponent,
    ProductDashboardComponent,
    ProductFormEditComponent,
    BasicFormComponent,
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    LayoutModule,
    SharedModule,
  ],
})
export class AdminModule {}
