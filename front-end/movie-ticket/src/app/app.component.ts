import { Component } from '@angular/core';
import { AuthService } from './services/auth.service';
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

  constructor(
    private authService: AuthService,
    private router: Router,
    private dialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');

    this.router.events.subscribe((event: Event) => {
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
  }

  onClickUsers() {
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'true');
  }

  onClickCinemas() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'true');
  }
}
