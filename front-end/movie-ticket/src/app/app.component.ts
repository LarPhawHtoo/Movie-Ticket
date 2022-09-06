import { Component } from '@angular/core';
import { Router, NavigationEnd, Event } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { LogoutConfirmComponent } from './components/logout-confirm/logout-confirm.component';
import { Role } from './interfaces/role.model';


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
  isAboutUs = false;
  isProfile = false;
  isDashboard = false;

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
        let isAboutUs = localStorage.getItem('isAboutUs');
        if (isAboutUs == 'true') {
          this.isAboutUs = true;
        } else {
          this.isAboutUs = false;
        }
        let isDashboard = localStorage.getItem('isDashboard');
        if (isDashboard == 'true') {
          this.isDashboard = true;
        } else {
          this.isDashboard = false;
        }
        let isProfile = localStorage.getItem('isProfile');
        if (isProfile == 'true') {
          this.isProfile = true;
        } else {
          this.isProfile = false;
        }
      }
    });
  }

  get isAdmin() {
    return this.loggedInUser && this.loggedInUser.type === Role.Admin;
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
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');
  }

  onClickUsers() {
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'true');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');
  }

  onClickCinemas() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'true');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');
  }
  onClickMovies() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isMovies', 'true');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');
  }

  onClickTickets() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'true');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');
  }

  onClickAboutUs() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isAboutUs', 'true');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');
  }
  onClickDashboard() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'true');
    localStorage.setItem('isProfile', 'false');
  }

  onClickProfile() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'true');
  }
}
