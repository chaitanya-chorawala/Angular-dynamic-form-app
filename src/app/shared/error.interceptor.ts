import { HttpErrorResponse, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, from, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';

export const errorInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const handleUnauthorisedError = (request: HttpRequest<unknown>, next: HttpHandlerFn) => {    
    return from(authService.exchangeRefreshToken()).pipe(
      switchMap((token) => {
        const newRequest = request.clone({
          setHeaders: {
            Authorization: `Bearer ${token}`
          }
        })
        return next(newRequest);
      })
    )    
  }

  return next(req).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        console.log('401');
        
        return handleUnauthorisedError(req, next);        
      }
      return throwError(() => error);
    })
  )
}
