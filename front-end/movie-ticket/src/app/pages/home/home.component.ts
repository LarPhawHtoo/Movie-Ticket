import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { Role } from 'src/app/interfaces/role.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  loggedInUser: any;

  ngOnInit(): void {
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');

    if (localStorage.getItem('loginUser')) {
      this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');
    } else {
      this.loggedInUser = '';
    }
  }

  get isAdmin() {
    return this.loggedInUser && this.loggedInUser.type === Role.Admin;
  }

  onClickCinemas() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'true');
    localStorage.setItem('isMovies', 'false');
    localStorage.setItem('isTickets', 'false');
    localStorage.setItem('isAboutUs', 'false');
    localStorage.setItem('isDashboard', 'false');
    localStorage.setItem('isProfile', 'false');;
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
