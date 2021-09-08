import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { ProductFormComponent } from './components/product-form/product-form.component';
import { NavComponent } from './components/nav/nav.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { ProductDashboardComponent } from './components/product-dashboard/product-dashboard.component';
import { ProductFormEditComponent } from './components/product-form-edit/product-form-edit.component';
import { BasicFormComponent } from './components/basic-form/basic-form.component';
// Modules
import { CategoryModule } from '../category/category.module';

const routes: Routes = [
  {
    path: '',
    component: NavComponent,
    children: [
      {
        path: '',
        component: ProductDashboardComponent,
      },
      {
        path: 'list',
        component: ProductListComponent,
      },
      {
        path: 'create',
        component: ProductFormComponent,
      },
      {
        path: 'edit/:id',
        component: ProductFormEditComponent,
      },
      {
        path: 'basic',
        component: BasicFormComponent,
      },
      {
        path: 'category',
        loadChildren: () =>
          import('../category/category-routing.module').then(
            (m) => m.CategoryRoutingModule
          ),
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
