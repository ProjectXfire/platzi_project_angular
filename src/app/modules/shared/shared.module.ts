import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { QuicklinkModule } from 'ngx-quicklink';
// Components
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { StepperComponent } from './components/stepper/stepper.component';
// Directives & Pipes
import { HighlightDirective } from './directives/highlight/highlight.directive';
import { ExponentialPipe } from './pipes/exponential/exponential.pipe';
import { FibonacciPipe } from './pipes/fibonacci/fibonacci.pipe';
// Material design
import { MaterialModule } from '../material/material.module';

@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    HighlightDirective,
    ExponentialPipe,
    FibonacciPipe,
    StepperComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    ReactiveFormsModule,
    QuicklinkModule,
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    StepperComponent,
    HighlightDirective,
    ExponentialPipe,
    ReactiveFormsModule,
    FibonacciPipe,
  ],
})
export class SharedModule {}
