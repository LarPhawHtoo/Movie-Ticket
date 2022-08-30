import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { CinemaService } from 'src/app/services/cinema.service';
import { TicketService } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { SeatService } from 'src/app/services/seat.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-ticket-dialog',
  templateUrl: './create-ticket-dialog.component.html',
  styleUrls: ['./create-ticket-dialog.component.scss']
})
export class CreateTicketDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private cinemaService: CinemaService,
    private seatService: SeatService,
    private ticketService: TicketService,
    private dialogRef: MatDialogRef<CreateTicketDialogComponent>
  ) { }

  dates: string[] = ['22/08/2022', '11/08/2022', '14/08/2022', '25/08/2022'];
  times: string[] = ['10:30 AM', '1:00 PM', '2:30 PM', '3:00 PM'];
  movies: string[] = ['Dark', 'Cars', 'Spiderman: No Way Home', 'Arcane'];
  numOfPeople: number[] = [1, 2, 3, 4, 5];
  seats: any[] = [];
  selectedSeats: string[] = [];
  price: number = 5000;
  selectedCinema: string = '';

  cinemaDataSource = new MatTableDataSource<Cinema>;
  cinemas: Cinema[] = [];

  firstFormGroup!: FormGroup;

  ngOnInit(): void {
    this.cinemaService.getCinemas().subscribe((response: any) => {
      this.cinemaDataSource.data = response.data as Cinema[];

      for (let i = 0; i < this.cinemaDataSource.data.length; i++) {
        this.cinemas.push(this.cinemaDataSource.data[i]);
      }
    });

    this.firstFormGroup = this.fb.group({
      customerName: new FormControl('', Validators.required),
      cinema: new FormControl('', Validators.required),
      movie: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      numOfPeople: new FormControl('', Validators.required)
    });

    this.getSeats();
  }

  getInfo() {
    for (let cinema of this.cinemas) {
      if (cinema._id == this.firstFormGroup.controls['cinema'].value) {
        this.selectedCinema = cinema.name;
      }
    }
  }

  getSeats() {
    const cinemaId = '62fbc69ca2a6a54a936b1e9f';
    const body = {
      "date": "	2022/08/17",
      "time": "2:30 PM"
    }
    this.seatService.getSeats(cinemaId, body)
      .subscribe((response: any) => {
        this.seats = response.tickets;
        console.log(this.seats);
    })
  }

  onClickBuy() {
    const formData = new FormData();
    formData.append('customer_name', this.firstFormGroup.controls['customerName'].value);
    formData.append('cinema_id', this.firstFormGroup.controls['cinema'].value);
    formData.append('movie_id', this.firstFormGroup.controls['movie'].value);
    formData.append('date', this.firstFormGroup.controls['date'].value);
    formData.append('time', this.firstFormGroup.controls['time'].value);
    formData.append('seatNumber', `${this.seatService}`);
    formData.append('status', 'sold out');
    formData.append('price', `${this.price}`);
    

    //this.ticketService.addTicket(formData)
    //  .subscribe(res => {
    //    this.dialogRef.close('create');
    //  });
  }

  get myForm() {
    return this.firstFormGroup.controls;
  }

  onClickSeat(element: any) {
    const index = this.selectedSeats.indexOf(element);

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      return;
    }

    if (this.selectedSeats.length < this.firstFormGroup.controls['numOfPeople'].value) {
      this.selectedSeats.push(element);
    }
  }

}
