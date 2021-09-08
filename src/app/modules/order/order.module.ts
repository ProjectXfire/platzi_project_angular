import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// Module routing
import { OrderRoutingModule } from './order-routing.module';
// Components
import { OrderComponent } from './components/order/order.component';
// Material design
import { MaterialModule } from '../material/material.module';
// Share module
import { SharedModule } from '../shared/shared.module';


@NgModule({
  declarations: [
    OrderComponent
  ],
  imports: [
    CommonModule,
    OrderRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class OrderModule { }
