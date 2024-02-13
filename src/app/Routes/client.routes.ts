import { Routes } from '@angular/router';

export const ClientRoutes: Routes = [
  {
    path: '',
    title: 'Form | App',
    loadComponent: () => import('../Client/client.component').then(m => m.ClientComponent),
    loadChildren: () => [
      {path: 'form', title: 'Form | App', loadComponent: () => import('../Client/form/form.component').then(m => m.FormComponent)},
      {path: '', redirectTo: 'form', pathMatch: 'full'}
    ]
  },
];
