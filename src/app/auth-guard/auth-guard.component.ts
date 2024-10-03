import {inject, Injectable} from '@angular/core';
import {LoginService} from "../services/loginservice";
import { CanActivateFn, Router} from "@angular/router";


export const AuthGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);

  const isLoggedIn = loginService.isLoggedIn(); // Check if the user is logged in
  if (isLoggedIn) {
    return true; // Allow navigation if logged in
  } else {
    router.navigate(['/']); // Redirect to login page if not logged in
    return false;
  }
};
