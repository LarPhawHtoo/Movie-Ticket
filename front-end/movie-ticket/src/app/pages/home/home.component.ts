import { Component, OnInit } from '@angular/core';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  cinemas: Cinema[] = [];

  constructor(private activatedRoute: ActivatedRoute) { }

  displayedColumns: string[] = ['code', 'name', 'location','time', 'date'];
  dataSource = this.cinemas;

  ngOnInit(): void {
    this.activatedRoute.data.subscribe((response: any) => {
      this.cinemas = response.cinemas.data;
      console.log(this.cinemas)
      this.dataSource = this.cinemas;
      console.log(this.dataSource)
    })
  }

}
