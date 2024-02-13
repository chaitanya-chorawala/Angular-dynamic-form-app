import { CommonModule } from '@angular/common';
import { HttpClientModule, provideHttpClient, withInterceptors } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAnalyticsModule, ScreenTrackingService, UserTrackingService } from '@angular/fire/compat/analytics';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { environment } from '../../environments/environment';
import { NavbarComponent } from '../layouts/navbar/navbar.component';
import { errorInterceptor } from './error.interceptor';
import { HtmlRenderPipe } from './html-render.pipe';
import { TruncatePipe } from './truncate.pipe';
import { HeaderComponent } from '../layouts/header/header.component';

@NgModule({
  declarations: [HeaderComponent,NavbarComponent, TruncatePipe, HtmlRenderPipe],
  imports: [
    CommonModule,
    RouterModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireStorageModule,
    ToastrModule.forRoot(),
    ReactiveFormsModule,
    AngularFireAuthModule,
    AngularFireAnalyticsModule,
    FontAwesomeModule,
    HttpClientModule
  ],
  exports: [HeaderComponent,NavbarComponent, TruncatePipe, ReactiveFormsModule, FontAwesomeModule, HtmlRenderPipe],
  providers: [ToastrService, ScreenTrackingService, UserTrackingService,
    provideHttpClient(withInterceptors([errorInterceptor]))
  ],
})
export class SharedModule { }
