import { Injectable } from '@angular/core';
import { Product } from '../../../../models/app.product.model';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  constructor() {}

  private products: Product[] = [];
  private cart = new BehaviorSubject<Product[]>([]);

  cart$ = this.cart.asObservable();

  addCart(product: Product): any {
    const existInCart = this.products.find((prod) => prod._id === product._id);
    if (existInCart) {
      return `${product.name} is already added in cart`;
    }
    this.products = [...this.products, product];
    this.cart.next(this.products);
    return `${product.name} is added to the cart`;
  }
}
