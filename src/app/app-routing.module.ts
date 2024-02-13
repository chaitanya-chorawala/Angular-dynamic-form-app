import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';
import { LoginComponent } from './auth/login/login.component';

const routes: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./client/client.module').then((m) => m.ClientModule),
    data: {
      state: 'client',
    },
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.AdminModule),
    canActivate: [authGuard],
    canActivateChild: [authGuard],
    data: {
      state: 'admin',
    },
  },
  {
    path: 'login',
    title: 'Login | Blog App',
    component: LoginComponent,
    data: {
      state: 'login',
    },
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      useHash: true
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
