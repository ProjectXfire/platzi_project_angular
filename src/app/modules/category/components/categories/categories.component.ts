import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@core/services/category/category.service';
import { Category } from '@model/app.category.model';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  categories: Category[] = [];

  constructor(private categoryService: CategoryService) {}

  fetchData(): void {
    this.categoryService.getAll().subscribe((cat) => {
      this.categories = cat;
    });
  }

  deleteCategory(id: string): void {
    this.categoryService.delete(id).subscribe((res) => {
      if (res) {
        this.categories = this.categories.filter((cat) => cat._id !== id);
      }
    });
  }

  editCategory(id: string): void {}

  ngOnInit(): void {
    this.fetchData();
  }
}
