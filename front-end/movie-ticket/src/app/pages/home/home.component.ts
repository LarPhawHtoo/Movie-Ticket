import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/interfaces/cinema.model';

const cinemas: Cinema[] = [
  { name: 'Cinema 1', date: '15/08/2022', time: '12:00 PM' },
  { name: 'Cinema 2', date: '15/08/2022', time: '12:00 PM' },
  { name: 'Cinema 3', date: '15/08/2022', time: '12:00 PM' },
  { name: 'Cinema 4', date: '15/08/2022', time: '12:00 PM' },
];

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

  displayedColumns: string[] = ['name', 'date', 'time'];
  dataSource = cinemas;

  ngOnInit(): void {
  }

}
