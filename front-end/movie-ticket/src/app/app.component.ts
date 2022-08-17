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
      }
    });
  }

  openDialog() {
    const dialogRef = this.dialog.open(LogoutConfirmComponent, { width: '400px' });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    })
  }
}
