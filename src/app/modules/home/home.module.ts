import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '../material/material.module';
// Module routing
import { HomeRoutingModule } from './home-routing.module';
// Components
import { BannerComponent } from './components/banner/banner.component';
import { HomeComponent } from './components/home/home.component';
// Shared module
import { SharedModule } from '../shared/shared.module';
import { SearchComponent } from './components/search/search.component';

@NgModule({
  declarations: [HomeComponent, BannerComponent, SearchComponent],
  imports: [HomeRoutingModule, CommonModule, SharedModule, MaterialModule],
})
export class HomeModule {}
