import { Component, OnInit, OnDestroy } from '@angular/core';
import { GeneratorService } from '@core/services/generator/generator.service';
import { EmployeeData } from '@model/app.employee.model';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

const name = ['Pepe', 'Lucia', 'Sanez', 'Pipon', 'Meche'];

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit, OnDestroy {
  salesList: EmployeeData[] = [];
  itList: EmployeeData[] = [];
  value$: Observable<number>;
  // sub$: Subscription;

  constructor(private generatorService: GeneratorService) {
    this.salesList = this.generatorService.generate(name, [10, 30], 10);
    this.itList = this.generatorService.generate(name, [10, 30], 10);
    this.value$ = this.generatorService
      .getData()
      .pipe(tap((res) => console.log(res)));
    /*     this.sub$ = this.generatorService.getData().subscribe((value) => {
      this.value = value;
      console.log(this.value);
    }); */
  }

  addItem(list: EmployeeData[], label: string): void {
    list.unshift({
      label,
      num: this.generatorService.generateNumber([10, 30]),
    });
  }

  deleteItem(list: EmployeeData[], index: number): void {
    list.splice(index, 1);
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    // this.sub$.unsubscribe();
  }
}
