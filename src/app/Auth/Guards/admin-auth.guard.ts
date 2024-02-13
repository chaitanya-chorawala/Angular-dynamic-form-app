import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../Services/auth.service';

export const adminAuthGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = inject(AuthService).isAdmin();
  if(!isLoggedIn) inject(Router).navigate(['/login']);
  return isLoggedIn;
};
