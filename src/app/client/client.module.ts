import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { PostCardComponent } from '../layouts/post-card/post-card.component';
import { ContactUsComponent } from '../pages/contact-us/contact-us.component';
import { SharedModule } from '../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';

@NgModule({
  declarations: [
    ContactUsComponent,
    PostCardComponent,
    ClientComponent,
  ],
  imports: [
    CommonModule,
    ClientRoutingModule,
    SharedModule
  ]
})
export class ClientModule { }
