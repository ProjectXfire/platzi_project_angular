import { Component, OnInit } from '@angular/core';
import { CategoryService } from '@core/services/category/category.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Category } from '@model/app.category.model';

@Component({
  selector: 'app-category',
  templateUrl: './category.container.html',
  styleUrls: ['./category.container.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class CategoryContainer implements OnInit {
  category: Category;
  title: string;
  action: string;

  constructor(
    private categoryService: CategoryService,
    private router: Router,
    private routeParams: ActivatedRoute
  ) {}

  createCategory(category: Category): void {
    this.categoryService
      .create(category)
      .subscribe(() => this.router.navigate(['/admin/category']));
  }

  updateCategory(data): void {
    this.categoryService
      .update(this.category._id, data)
      .subscribe(() => this.router.navigate(['/admin/category']));
  }

  private getCategory(id: string): void {
    this.categoryService.getOne(id).subscribe((category) => {
      this.category = category;
    });
  }

  ngOnInit(): void {
    this.routeParams.params.subscribe((params: Params) => {
      const id = params.id;
      if (id) {
        this.getCategory(id);
        this.title = 'Edit category';
        this.action = 'Update';
      } else {
        this.title = 'Create category';
        this.action = 'Create';
      }
    });
  }
}
