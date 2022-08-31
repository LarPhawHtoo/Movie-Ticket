import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {

  constructor(private router: Router) { }
  
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
      let url: string = state.url;
      return this.checkType(url);
  }

  checkType(url: string): any {
    let val: any = localStorage.getItem('isUserLoggedIn');
    let loggedInUser: any = JSON.parse(localStorage.getItem('loginUser') || '');
    console.log(loggedInUser.type);

    if (val == 'true') {
      if (loggedInUser.type == 'User') {
        if (url == '/cinemas' || '/users' || '/movies') {
          return this.router.parseUrl('/');
        } else {
          return this.router.parseUrl(url);
        }
      } else if (loggedInUser.type == 'Admin') {
        return this.router.parseUrl(url);
      }
    } else {
      return this.router.parseUrl('/login');
    }
  }
  
}
