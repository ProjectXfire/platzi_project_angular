import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '@environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class GiphyService {
  constructor(private http: HttpClient) {}

  getData(query: string): Observable<any> {
    return this.http.get(
      `${environment.giphy.URL_API}/search?limit=12&q=${query}&api_key=${environment.giphy.API_KEY}`
    );
  }
}
