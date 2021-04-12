import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export const InterceptorSkipHeader = '';

@Injectable()
export class AuthHttpInterceptor implements HttpInterceptor {

  isNot: boolean;

  constructor(private router: Router) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('token');

    //saltea el agregado del token
    if (req.headers.has('password')) {
      const headers = req.headers.delete(InterceptorSkipHeader);
      return next.handle(req.clone({ headers }));
    }

    if (token) {
      req = req.clone({
        headers: req.headers.set('token', token)
      });
    }


    return next.handle(req).pipe(
      tap(() => {
        // success
      }, (err: any) => {
        // error

        if (err instanceof HttpErrorResponse) {
          let error = err.error;

          if (typeof err.error === 'string') {
            error = JSON.parse(err.error);
          }
          if (err.status === 0) {
            // redirect user to login
            this.router.navigate(['/login']);
          }

        }
      })
    );


  }
}

