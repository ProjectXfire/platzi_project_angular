import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Observable } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

import { Category } from '@model/app.category.model';
import { environment } from '@environments/environment';
import { handleError } from '@utils/handleErrors';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private httpClient: HttpClient) {}

  getAll(): Observable<Category[]> {
    return this.httpClient
      .get<Category[]>(`${environment.URL_API}/categories`)
      .pipe(catchError((err) => handleError(err)));
  }

  getOne(id: string): Observable<Category> {
    return this.httpClient
      .get<Category>(`${environment.URL_API}/categories/${id}`)
      .pipe(catchError((err) => handleError(err)));
  }

  create(category: Category): Observable<Category> {
    return this.httpClient
      .post<Category>(`${environment.URL_API}/categories`, category)
      .pipe(catchError((err) => handleError(err)));
  }

  update(id: string, data: Partial<Category>): Observable<any> {
    return this.httpClient
      .post(`${environment.URL_API}/categories/${id}`, data)
      .pipe(catchError((err) => handleError(err)));
  }

  delete(id: string): Observable<any> {
    return this.httpClient
      .delete(`${environment.URL_API}/categories/${id}`)
      .pipe(catchError((err) => handleError(err)));
  }

  availabilityCategory(name: string): Observable<unknown> {
    return this.httpClient
      .post(`${environment.URL_API}/categories/availability`, { name })
      .pipe(catchError((err) => handleError(err)));
  }
}
