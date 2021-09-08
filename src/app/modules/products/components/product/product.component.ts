import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Product } from '@model/app.product.model';
// Services
import { CartService } from '@core/services/cart/cart.service';
// Alert
import Swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss']
})
export class ProductComponent implements OnInit {
  @Input() product: Product;
  @Output() productClicked: EventEmitter<Product> = new EventEmitter();
  today = new Date();

  constructor(private cartService: CartService) {
    console.log('constructor');
  }

  ngOnInit(): void {}

  addToCart(product: Product): void {
    const message = this.cartService.addCart(product);
    Swal.fire(message);
    this.productClicked.emit(product);
  }
}
