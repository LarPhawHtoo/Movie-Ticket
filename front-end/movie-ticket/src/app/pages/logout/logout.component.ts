import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.scss']
})
export class LogoutComponent implements OnInit {

  constructor(
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.authService.logout();
    this.router.navigate(['/']);
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isMovies', 'false');
  }

}
