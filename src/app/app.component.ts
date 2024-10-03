import {Component} from '@angular/core';
import {NavigationEnd, Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent  {
  title = 'frontend';
  showNavBar=true;
  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // Hide nav bar on login page, show it on all other pages
        this.showNavBar = !(event.url === '/' || event.url === '/login');


      }
    });
  }

  ngOnInit(): void {
    // Listen for route changes

  }
}
