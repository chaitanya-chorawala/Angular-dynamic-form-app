import { Routes } from '@angular/router';
import { adminAuthGuard } from './Auth/Guards/admin-auth.guard';
import { authGuard } from './Auth/Guards/auth.guard';

export const routes: Routes = [
  {
    path:'admin',
    loadChildren: () => import('./Routes/admin.routes').then(m => m.AdminRoutes),
    canActivate: [authGuard, adminAuthGuard],
    canActivateChild: [authGuard, adminAuthGuard],
  },
  {
    path: 'login',
    title: 'Login | App',
    loadComponent:() => import('./Auth/login/login.component').then(m => m.LoginComponent)
  },
  {
    path: '',
    loadChildren: () => import('./Routes/client.routes').then(m => m.ClientRoutes),
    canActivate: [authGuard],
    canActivateChild: [authGuard]
  },
  { path: '**', redirectTo: '' }
];
