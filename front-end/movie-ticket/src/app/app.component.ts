import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Happy Cinema';
  isUserLoggedIn = false;
  loggedInUser: any;
  isCinemas = false;
  isUsers = false;
  isMovies = false;
  isTickets = false;

  constructor(
    private router: Router,
    private dialog: MatDialog
  ) { }
  
  ngOnInit() {
    if (localStorage.getItem('loginUser')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    } else {
      this.loggedInUser = '';
    }
    
    this.router.events.subscribe((event: Event) => {
      if (localStorage.getItem('loginUser')) {
        this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
      } else {
        this.loggedInUser = '';
      }
      
      if (event instanceof NavigationEnd) {
        let storeData = localStorage.getItem('isUserLoggedIn');
        if (storeData == 'true') {
          this.isUserLoggedIn = true;
        } else {
          this.isUserLoggedIn = false;
        }

        let isCinemas = localStorage.getItem('isCinemas');
        if (isCinemas == 'true') {
          this.isCinemas = true;
        } else {
          this.isCinemas = false;
        }

        let isUsers = localStorage.getItem('isUsers');
        if (isUsers == 'true') {
          this.isUsers = true;
        } else {
          this.isUsers = false;
        }
        let isMovies = localStorage.getItem('isMovies');
        if (isMovies == 'true') {
          this.isMovies = true;
        } else {
          this.isMovies = false;
        }
        let isTickets = localStorage.getItem('isTickets');
        if (isTickets == 'true') {
          this.isTickets = true;
        } else {
          this.isTickets = false;
        }
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }

  onClickHome() {
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
  }

  onClickUsers() {
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'true');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
  }

  onClickCinemas() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'true');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
  }
  onClickMovies() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isMovies', 'true');
    localStorage.setItem('isTickets', 'false');
  }

  onClickTickets() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'true');
    localStorage.setItem('isMovies', 'false');
  }

  onClickAboutUs() {
    localStorage.setItem('isUsers', 'true');
    localStorage.setItem('isCinemas', 'true');
    localStorage.setItem('isTickets', 'true');
    localStorage.setItem('isMovies', 'true');
  }
}
