import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHandlerFn,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

export function loggingInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const toastr = inject(ToastrService);
  const router = inject(Router);

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastr.error('Usuário sem autorização');
        router.navigate(['/login']);
      } else if (error.status === 404) {
        toastr.error('Rota não localizada');
      } else {
        toastr.error('Ocorreu um erro inesperado', error.message);
      }

      return throwError(() => error);
    })
  );
}

export function authInterceptor(
  req: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
  const token = localStorage.getItem('auth_token');
  const router = inject(Router);
  const toastr = inject(ToastrService);

  let authReq = req;
  if (token) {
    authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        toastr.error('Usuário sem autorização');
        router.navigate(['/login']);
      } else if (error.status === 404) {
        toastr.error('Rota não localizada');
      } else {
        toastr.error('Ocorreu um erro inesperado', error.message);
      }

      return throwError(() => error);
    })
  );
}
