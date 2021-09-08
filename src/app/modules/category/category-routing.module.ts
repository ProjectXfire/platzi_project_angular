import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// Components
import { CategoriesComponent } from './components/categories/categories.component';
// Containers
import { CategoryContainer } from './containers/category/category.container';

const routes: Routes = [
  {
    path: '',
    component: CategoriesComponent,
  },
  {
    path: 'create',
    component: CategoryContainer,
  },
  {
    path: 'edit/:id',
    component: CategoryContainer,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoryRoutingModule {}
