import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// Module Routing
import { ProductsRoutingModule } from './products-routing.module';
// Components
import { ProductComponent } from './components/product/product.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CartComponent } from './components/cart/cart.component';
// Containers
import { ProductsContainer } from './containers/products/products.container';
// Shared module
import { SharedModule } from '../shared/shared.module';
// Material design
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    ProductsContainer,
    ProductComponent,
    ProductDetailComponent,
    CartComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ProductsRoutingModule,
    MaterialModule
  ]
})
export class ProductsModule { }
