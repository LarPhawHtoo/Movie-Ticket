import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isTickets', 'false');
  }

  onClickCinemas() {
    localStorage.setItem('isCinemas', 'true');
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isTickets', 'false');
  }

  onClickUsers() {
    localStorage.setItem('isUsers', 'true');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'false');
  }

  onClickTickets() {
    localStorage.setItem('isUsers', 'false');
    localStorage.setItem('isCinemas', 'false');
    localStorage.setItem('isTickets', 'true');
  }

}
