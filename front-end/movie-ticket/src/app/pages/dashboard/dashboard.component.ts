import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { DashboardService } from 'src/app/services/dashboard.service';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboarddata!: any;
  constructor(
    private dashboardService: DashboardService,
  ) { }

  datePipe = new DatePipe('en-US');
  today = new Date();
  date = this.datePipe.transform(this.today, 'dd/MM/yyyy');

  ngOnInit(): void {
    let payload = {
      //date: moment().format('dd/MM/yyyy')
      date: this.date
    }
    this.dashboardService.getDashboard(payload).subscribe((response: any) => {
      this.dashboarddata = response.tickets;
      console.log(this.dashboarddata);
    })
  }


}
