import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { TokenService } from '@core/services/token/token.service';
import { handleError } from '@utils/handleErrors';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: AngularFireAuth,
    private http: HttpClient,
    private tokenService: TokenService
  ) {}

  createUser(email: string, password: string): Promise<any> {
    return this.auth.createUserWithEmailAndPassword(email, password);
  }
  login(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }
  logout(): Promise<any> {
    return this.auth.signOut();
  }
  isLogged(): Observable<any> {
    return this.auth.authState;
  }
  loginRestApi(email: string, password: string): Observable<any> {
    return this.http
      .post('https://young-bastion-51103.herokuapp.com/auth/login', {
        email,
        password,
      })
      .pipe(
        catchError((err) => handleError(err)),
        tap((res: { access_token: string }) => {
          const token = res.access_token;
          this.tokenService.setToken(token);
        })
      );
  }
}
