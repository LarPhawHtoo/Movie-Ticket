import { Component, OnInit } from '@angular/core';
import { catchError, of } from 'rxjs';
import { DashboardserviceService } from 'src/app/services/dashboardservice.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  dashboardService: any;

  constructor() { }

  ngOnInit(): void {
  }


}
