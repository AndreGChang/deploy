import { Observable, catchError, of, throwError } from 'rxjs';
import { HTTP_INTERCEPTORS, HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { AuthTokenService } from '../shared/auth-token.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpinterceptorService implements HttpInterceptor{

  constructor() { }

  authToken = inject(AuthTokenService);

  router = inject(Router);

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    let token = this.authToken.getToken();
    if (token) {
      req = req.clone({
        setHeaders: {Authorization: 'Bearer ' + token}
      })
    }
    return next.handle(req).pipe(catchError(x => this.errorHandler(x)));
  }

  private errorHandler(err: HttpErrorResponse): Observable<any> {
    if (err.status === 401) {
      alert('401 - tratar');
      this.router.navigateByUrl('/login');
      return of(err.message);
    } else if (err.status === 403) {
      alert('403 - tratar');
      return of(err.message);
    }
    return throwError(() => err);
}

}

export const httpInterceptorProviders = [
  { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true }
];
