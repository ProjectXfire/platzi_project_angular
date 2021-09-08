import { Component } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

// declare var gtag;

@Component({
  selector: 'app-root',
  // templateUrl: './app.component.html',
  template: '<router-outlet></router-outlet>',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'proyect-store';
  constructor(private router: Router) {
    /* const navEndEvents$ = this.router.events.pipe(
      filter((event) => event instanceof NavigationEnd)
    );
    navEndEvents$.subscribe((event: NavigationEnd) => {
      gtag('config', 'G-SB7M3R30NX', { page_path: event.urlAfterRedirects });
    }); */
  }
}
