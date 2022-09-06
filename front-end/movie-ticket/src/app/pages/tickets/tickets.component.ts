import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { Ticket } from 'src/app/interfaces/ticket.model';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { TicketService } from 'src/app/services/ticket.service';
import { catchError, of } from 'rxjs';
import { CreateTicketDialogComponent } from 'src/app/components/create-ticket-dialog/create-ticket-dialog.component';
import { UpdateTicketDialogComponent } from 'src/app/components/update-ticket-dialog/update-ticket-dialog.component';
import { DeleteTicketConfirmDialogComponent } from 'src/app/components/delete-ticket-confirm-dialog/delete-ticket-confirm-dialog.component';

@Component({
  selector: 'app-tickets',
  templateUrl: './tickets.component.html',
  styleUrls: ['./tickets.component.scss']
})
export class TicketsComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private dialog: MatDialog,
    private activatedRoute: ActivatedRoute,
    private ticketService: TicketService
  ) { }

  // variables for showing tickets
  displayedColumns: string[] = ['customer_name', 'seatNumber', 'movie', 'cinema', 'price', 'date', 'time', 'status', 'createdAt', 'updatedAt', 'actions'];
  dataSource = new MatTableDataSource<Ticket>();

  loggedInUser: any;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');

    this.activatedRoute.data.subscribe((response: any) => {
      console.log(response.tickets.tickets);
      this.dataSource.data = response.tickets.tickets as Ticket[];
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  getTickets() {
    this.ticketService.getTickets().pipe(
      catchError(error => {
        return of(error);
      })
    ).subscribe((response: any) => {
      this.dataSource.data = response.tickets as Ticket[];
    })
  }

  public doFilter = (target: any) => {
    this.dataSource.filter = target.value.trim().toLocaleLowerCase();
  }

  openCreateTicketDialog() {
    let dialogRef = this.dialog.open(CreateTicketDialogComponent);
    dialogRef.afterClosed().subscribe((data) => {
      if (data == "create") {
        this.getTickets();
      }
    });
  }

  openUpdateDialog(element: any) {
    const dialogRef = this.dialog.open(UpdateTicketDialogComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if (result == 'update') this.getTickets();
    })
  }

  openDeleteDialog(element: any) {
    const dialogRef = this.dialog.open(DeleteTicketConfirmDialogComponent, { data: element });
    dialogRef.afterClosed().subscribe(result => {
      if(result == 'delete') this.getTickets();
    })
  }

}
