import {Component, Inject, OnInit} from '@angular/core';
import {LoginService} from "../services/loginservice";
import {UserResponse} from "../User/user-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

credentials ={
  username:'',
  password:''
}
  err: boolean = false;  // Initial value set to true to show the alert


constructor(@Inject(LoginService)private loginService: LoginService,private router:Router) {

}
  ngOnInit(): void {
    this.loginService.logOut(); // Clear authentication state
  }

  onSubmit() {
    this.loginService.getUserByUserNameAndPassword(this.credentials).subscribe((response:UserResponse)=>{
      if(response.code == "0"&&response.message=="success"){
        this.loginService.loginUser("token");
        this.router.navigate(['/listProducts'])
      }else{
        // setTimeout(() => {
        //   this.err = false;
        // }, 3000);

        setTimeout(() => {
          this.err = true;

          // Hide the alert after 5 seconds
          setTimeout(() => {
            this.err = false;
          }, 3000);  // Hide after 5 seconds of being visible

        }, 1000);  // 2 seconds delay before showing
      }
    })

  }
  logout() {
    this.loginService.logOut(); // Clear authentication state
    this.router.navigate(['/login']); // Redirect to login page
    window.history.replaceState({}, document.title); // Clear history state
  }
  closeAlert(): void {
    this.err = false;
  }

}


