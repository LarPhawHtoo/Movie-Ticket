import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'movie-ticket';
  isUserLoggedIn = false;

  constructor(private authService: AuthService) { }
  
  ngOnInit() {
    let storeData = localStorage.getItem('isUserLoggedIn');
    if (storeData != null && storeData == 'true') {
      this.isUserLoggedIn = true;
    } else {
      this.isUserLoggedIn = false;
    }
  }
}
