import { Component, OnInit } from '@angular/core';
import { Product } from '@model/app.product.model';
import { ProductsService } from '@core/services/products/products.service';
import { format } from 'date-fns';

@Component({
  selector: 'app-products',
  templateUrl: './products.container.html',
  styleUrls: ['./products.container.scss'],
})
// tslint:disable-next-line: component-class-suffix
export class ProductsContainer implements OnInit {
  products: Product[];
  date: string;

  constructor(private productsService: ProductsService) {}

  ngOnInit(): void {
    this.productsService.getAllProducts().subscribe(
      (product) => (this.products = product),
      (error) => console.log(error)
    );
    this.date = format(new Date(), 'dd/MM/yyyy');
  }

  clickProduct(prod: any): void {
    console.log(prod.id);
    console.log(prod.title);
  }

  getFile(): void {
    this.productsService.getFile().subscribe((res) => console.log(res));
  }
}
