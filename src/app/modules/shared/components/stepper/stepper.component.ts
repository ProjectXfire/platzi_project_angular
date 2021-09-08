import { Component, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-stepper',
  templateUrl: './stepper.component.html',
  styleUrls: ['./stepper.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => StepperComponent),
      multi: true,
    },
  ],
})
export class StepperComponent implements OnInit, ControlValueAccessor {
  constructor() {}

  currentValue = 5;
  isDisabled: boolean;
  onChange = (value: any) => {};
  onTouch = () => {};

  writeValue(value: number): void {
    this.currentValue = value;
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState?(isDisabled: boolean): void {
    this.isDisabled = isDisabled;
  }

  add(): void {
    this.currentValue++;
    this.onTouch();
    this.onChange(this.currentValue);
  }

  sub(): void {
    if (this.currentValue > 0) {
      this.currentValue--;
      this.onTouch();
      this.onChange(this.currentValue);
    }
  }

  ngOnInit(): void {}
}
