import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Product } from '@model/app.product.model';
import { environment } from '@environments/environment';
import { handleError } from '@utils/handleErrors';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${environment.URL_API}/products`).pipe(
      retry(2),
      catchError((err) => handleError(err))
    );
  }
  getProduct(id: string): Observable<Product> {
    return this.http
      .get<Product>(`${environment.URL_API}/products/${id}`)
      .pipe(catchError((err) => handleError(err)));
  }
  createProduct(product: Product): Observable<Product> {
    return this.http
      .post<Product>(`${environment.URL_API}/products`, product)
      .pipe(catchError((err) => handleError(err)));
  }
  updateProduct(id: string, changes: Partial<Product>): Observable<Product> {
    return this.http
      .put<Product>(`${environment.URL_API}/products/${id}`, changes)
      .pipe(catchError((err) => handleError(err)));
  }
  deleteProduct(id: string): Observable<any> {
    return this.http
      .delete(`${environment.URL_API}/products/${id}`)
      .pipe(catchError((err) => handleError(err)));
  }
  getFile(): Observable<any> {
    return this.http.get('assets/files/test.txt', { responseType: 'text' });
  }
}
