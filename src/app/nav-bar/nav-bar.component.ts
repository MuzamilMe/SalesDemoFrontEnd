import {Component} from '@angular/core';
import {ProductService} from '../product.service';
import {LoginService} from "../services/loginservice";
import {Router} from "@angular/router";

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent {
  constructor(private productService: ProductService,private  loginService: LoginService,private router:Router) {
  }
  ngOnInit() {

  }
  logout() {
    this.loginService.logOut(); // Clear authentication state
    this.router.navigate(['/login']); // Redirect to login page
    window.history.replaceState({}, document.title); // Clear history state

  }

}
