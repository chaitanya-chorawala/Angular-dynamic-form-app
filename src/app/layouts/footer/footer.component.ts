import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {
  isAdminRoute!: Boolean;
  constructor(private router: Router){
    router.events.pipe(
      filter(event => event instanceof NavigationEnd))
      .subscribe(event => {
          this.isAdminRoute = event.toString().includes("admin");
      });
  }
}
