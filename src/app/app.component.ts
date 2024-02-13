import { animate, group, query, style, transition, trigger } from '@angular/animations';
import { Component, OnInit, inject } from '@angular/core';
import { AngularFireAnalytics } from '@angular/fire/compat/analytics';
import { AuthService } from './services/auth.service';
import { environment } from '../environments/environment';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  animations: [
    trigger('routerTransition', [
      transition('* <=> *', [
        query(':enter, :leave', style({ position: 'fixed', width: '100%' }), { optional: true }),
        group([
          query(':enter', [
            style({ transform: 'translateX(100%)' }),
            animate('0.3s ease-in-out', style({ transform: 'translateX(0%)' }))
          ], { optional: true }),
          query(':leave', [
            style({ transform: 'translateX(0%)' }),
            animate('0.2s ease-in-out', style({ transform: 'translateX(-100%)' }))
          ], { optional: true }),
        ])
      ])
    ])
  ]
})
export class AppComponent implements OnInit {
  title = 'blog-app';
  authService = inject(AuthService);
  env = environment.firebaseConfig;

  constructor(analytics: AngularFireAnalytics) {
    analytics.logEvent('app-open', { "component": "AppComponent" })
  }

  ngOnInit(): void {
    this.doLogin();
  }

  async doLogin() {
    try {      
      if (!this.authService.getUser().accessToken) { 
        console.log('app login');        
        await this.authService.login(this.env.defaultUser, this.env.defaultPassword);
      }
    } catch (error) {            
    }
  }

  getState(outlet: any) {
    // Changing the activatedRouteData.state triggers the animation
    return outlet.activatedRouteData.state;
  }
}
