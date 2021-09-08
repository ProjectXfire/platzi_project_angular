import {
  Component,
  OnInit,
  Input,
  EventEmitter,
  Output,
  ChangeDetectionStrategy,
} from '@angular/core';
import { EmployeeData } from '@model/app.employee.model';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ListComponent implements OnInit {
  @Input() title: string;
  @Input() data: EmployeeData[] = [];
  @Output() add = new EventEmitter<string>();
  @Output() delete = new EventEmitter<number>();
  label: string;

  constructor() {}

  addItem(): void {
    this.add.emit(this.label);
    this.label = '';
  }

  deleteItem(index: number): void {
    this.delete.emit(index);
  }

  ngOnInit(): void {}
}
