// Module
import { ContactRoutingModule } from './contact-routing.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
import { FormsModule } from '@angular/forms';
// Shared module
import { SharedModule } from '../shared/shared.module';
// Components
import { LayoutComponent } from './components/layout/layout.component';
import { ListComponent } from './components/list/list.component';

@NgModule({
  declarations: [LayoutComponent, ListComponent],
  imports: [
    CommonModule,
    SharedModule,
    ContactRoutingModule,
    MaterialModule,
    FormsModule,
  ],
})
export class ContactModule {}
