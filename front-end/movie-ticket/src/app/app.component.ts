import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
import { Router, NavigationEnd, Event } from '@angular/router';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Happy Cinema';
  isUserLoggedIn = false;

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationEnd) {
        let storeData = localStorage.getItem('isUserLoggedIn');
        if (storeData == 'true') {
          this.isUserLoggedIn = true;
        } else {
          this.isUserLoggedIn = false;
        }
      }
    });
  }
}
