import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { ClientComponent } from './client.component';

const routes: Routes = [
  {
    path: ''
    , title: 'Home | Forms App'
    , component: ClientComponent
    , children: [
      { path: 'home', title: 'Home | Forms App', component: ContactUsComponent },
      { path: '', redirectTo: '/home', pathMatch: 'full' }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ClientRoutingModule { }
