import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor(private cookieService: CookieService) {}

  setToken(token: any): void {
    this.cookieService.set('user', token, { expires: 1 });
  }

  getToken(key: string): string {
    const token = this.cookieService.get(key);
    return token;
  }

  deleteToken(): void {
    this.cookieService.delete('token');
  }
}
