import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {UserResponse} from "../User/user-response";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  url = "http://localhost:9191"

  constructor(private http: HttpClient) {
  }

  generateToken(credentials: any) {
    console.log(credentials)
    return this.http.post(`${this.url}/auth/login`, credentials);
  }

  getUserByUserNameAndPassword(credentials: { username: string, password: string }): Observable<UserResponse> {
    const formData: FormData = new FormData();
    formData.append('username', credentials.username);
    formData.append('password', credentials.password);
    return this.http.post<UserResponse>(`${this.url}/user/getByUAP`, formData);

  }

  loginUser(token: string) {
    localStorage.setItem("token", token);
    return true;
  }

  isLoggedIn() {
    let token = localStorage.getItem("token");
    return !(token == undefined || token == '' || token == null);
  }

  logOut() {
    localStorage.removeItem("token");
    return true;
  }

  getToken() {
    return localStorage.getItem("token")
  }
}
