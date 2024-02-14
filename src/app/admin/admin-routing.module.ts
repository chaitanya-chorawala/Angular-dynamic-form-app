import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ContactusComponent } from './contactus/contactus.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';

const routes: Routes = [
  {
    path: '',
    title: 'Admin | Blog App',
    component: AdminComponent,
    children: [
      { path: 'dashboard', title: 'Dashboard | Admin | Blog App', component: DashboardComponent },
      { path: 'forms', title: 'Forms | Admin | Blog App', component: ContactusComponent },
      { path: 'forms/:id', title: 'Forms | Admin | Blog App', component: ContactUsComponent },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
