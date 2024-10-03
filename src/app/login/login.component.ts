import {Component, Inject} from '@angular/core';
import {LoginService} from "../services/loginservice";
import {UserResponse} from "../User/user-response";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

credentials ={
  username:'',
  password:''
}


constructor(@Inject(LoginService)private loginService: LoginService,private router:Router) {
}
  onSubmit() {
    this.loginService.getUserByUserNameAndPassword(this.credentials).subscribe((response:UserResponse)=>{
      if(response.code == "0"&&response.message=="success"){
        this.loginService.loginUser("token");
        this.router.navigate(['/listProducts'])
      }else{
        alert(response.message);
      }
    })

  }
  logout() {
    this.loginService.logOut(); // Clear authentication state
    this.router.navigate(['/login']); // Redirect to login page
    window.history.replaceState({}, document.title); // Clear history state
  }


}
