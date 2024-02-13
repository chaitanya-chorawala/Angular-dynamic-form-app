import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { faArrowRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { filter, map, switchMap } from 'rxjs/operators';
import { IRoutes } from '../../model/routes';
import { AuthService } from '../../services/auth.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {
  routes: IRoutes[] = [];
  clientRoutes: IRoutes[] = [];
  faArrowRightFromBracket = faArrowRightFromBracket;
  // [
  //   { routeKey: '/', routeValue: 'Home' },
  //   { routeKey: '/about-us', routeValue: 'About Us' },
  //   { routeKey: '/contact-us', routeValue: 'Contact Us' },
  //   { routeKey: '/terms-and-condition', routeValue: 'Terms & Condition' }
  // ]
  adminRoutes: IRoutes[] = [
    { routeKey: '/admin/dashboard', routeValue: 'Dashboard' },
    { routeKey: '/admin/forms', routeValue: 'Forms' }
  ]

  isAdminRoute!: Boolean;
  constructor(private router: Router
    , private authService: AuthService
    , private afAuth: AngularFireAuth) {
    router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
        this.isAdminRoute = event.toString().includes("admin");
      });
  }

  ngOnInit(): void {
    if (this.isAdminRoute) {
      this.routes = [...this.adminRoutes];
      return;
    }

  }

  async logout() {
    try {
      await this.authService.logout();
    } catch (error) {
      console.error(error);
    }
  }
}
