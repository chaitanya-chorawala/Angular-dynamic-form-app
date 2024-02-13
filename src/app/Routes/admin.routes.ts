import { Routes } from "@angular/router";

export const AdminRoutes: Routes = [
  {
    path: '',
    title: 'Dashboard | Admin | App',
    loadComponent: () => import('../Admin/admin.component').then(m => m.AdminComponent),
    loadChildren:()=> [
      {path: 'dashboard', title: 'Dashboard | Admin | App', loadComponent: () => import('../Admin/dashboard/dashboard.component').then(x => x.DashboardComponent)},
      {path: 'forms', title: 'Forms | Admin | App', loadComponent: () => import('../Admin/forms/forms.component').then(x => x.FormsComponent)},
      {path: '', redirectTo: 'dashboard', pathMatch: 'full'},
    ]
  }
];
