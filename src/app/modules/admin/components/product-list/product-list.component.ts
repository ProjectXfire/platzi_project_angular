import { Component, OnInit, ViewChild } from '@angular/core';
import { ProductsService } from '@core/services/products/products.service';
import { Product } from '@model/app.product.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.scss'],
})
export class ProductListComponent implements OnInit {
  products: Product[] = [];
  displayedColumns: string[] = ['_id', 'name', 'price', 'actions'];
  dataSource = new MatTableDataSource<Product>(this.products);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.fetchData();
  }

  fetchData(): void {
    this.productsService.getAllProducts().subscribe((data) => {
      this.products = data;
      this.dataSource.data = data;
      this.dataSource.paginator = this.paginator;
    });
  }

  deleteProduct(id: string): void {
    this.productsService.deleteProduct(id).subscribe((res) => {
      if (res) {
        this.products = this.products.filter((prod) => prod._id !== id);
        this.dataSource.data = this.products;
      }
    });
  }
}
