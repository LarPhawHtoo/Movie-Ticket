import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {

    let url: string = state.url;
    return this.checkLogin(url);
  }

  checkLogin(url: string): any {
    let val: any = localStorage.getItem('isUserLoggedIn');

    if (val == 'true') {
      if (url == "/login") {
        this.router.parseUrl('/home');
      } else {
        return true;
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
}
