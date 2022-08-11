import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';

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
    console.log(val);

    if (val != null && val == 'true') {
      if (url == "/login") {
        this.router.parseUrl('/home');
      } else {
        return false;
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
  
}
