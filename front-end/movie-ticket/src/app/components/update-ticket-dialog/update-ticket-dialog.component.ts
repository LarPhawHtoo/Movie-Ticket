import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';
import { SeatService } from 'src/app/services/seat.service';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/services/movie.service';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { CinemaService } from 'src/app/services/cinema.service';
import { MatTableDataSource } from '@angular/material/table';
import { MAT_DATE_FORMATS } from '@angular/material/core';
import { DatePipe } from '@angular/common';

export const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY',
  },
  display: {
    dateInput: 'YYYY/MM/DD',
    monthYearLabel: 'MMMM YYYY',
    dateAllyLabel: 'LL',
    monthYearAllyLabel: 'MMMM YYYY'
  },
};

@Component({
  selector: 'app-update-ticket-dialog',
  templateUrl: './update-ticket-dialog.component.html',
  styleUrls: ['./update-ticket-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class UpdateTicketDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<UpdateTicketDialogComponent>,
    private fb: FormBuilder,
    private ticketService: TicketService,
    private movieService: MovieService,
    private cinemaService: CinemaService,
    private seatService: SeatService,
    @Inject(MAT_DIALOG_DATA) public data: UpdateTicketDialogComponent,
  ) { 
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 10);
  }

  _id: string = '';
  times: string[] = [];
  numOfPeople: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  seats: any[] = [];
  selectedSeats: string[] = [];
  price: number = 0;
  selectedCinema: any;
  selectedMovie: string = '';
  selectedTime: string = '';
  minDate = new Date();
  maxDate!: Date;
  loading = false;

  movieDataSource = new MatTableDataSource<Movie>;
  movies: Movie[] = [];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  cinema_id: any;
  customer_name: any;
  movie_id: any;
  seatNumber: any;
  date: any;
  time: any;

  ngOnInit(): void {
    this.movieService.getNowShowingMovies().subscribe((response: any) => {
      this.movieDataSource.data = response.movies as Movie[];

      for (let i = 0; i < this.movieDataSource.data.length; i++) {
        this.movies.push(this.movieDataSource.data[i]);
      }
    });

    this.firstFormGroup = this.fb.group({
      customerName: new FormControl(this.data.customer_name, Validators.required),
      movie: new FormControl(this.data.movie_id?._id, Validators.required),
      date: new FormControl(this.data.date, Validators.required),
      numOfPeople: new FormControl(this.data.seatNumber.length, Validators.required)
    });

    this.secondFormGroup = this.fb.group({
      time: new FormControl(this.data.time, Validators.required),
    });
  }

  getInfo() {
    for (let movie of this.movies) {
      if (movie._id == this.firstFormGroup.controls['movie'].value) {
        this.selectedMovie = movie.name;
        this.selectedCinema = movie.cinema_id;

        for (let i = 0; i < movie.time.length; i++) {
          this.times.push(movie.time[i]);
        }
      }
    }
  }

  getTime() {
    this.selectedTime = this.secondFormGroup.controls['time'].value;

    this.getSeats();
  }

  getSeats() {
    this.loading = true;
    const cinemaId = this.selectedCinema?._id;
    const datePipe = new DatePipe('en-US');
    const date = datePipe.transform(this.firstFormGroup.controls['date'].value, 'dd/MM/yyyy');
    const body = {
      "date": date,
      "time": this.selectedTime
    }
    this.seatService.getSeats(cinemaId, body)
      .subscribe((response: any) => {
        this.loading = false;
        this.seats = response.tickets;
    })
  }

  onClickBuy() {
    const id = this.data._id;
    const datePipe = new DatePipe('en-US');
    const date = datePipe.transform(this.firstFormGroup.controls['date'].value, 'dd/MM/yyyy');

    let data = {
      customer_name: this.firstFormGroup.controls['customerName'].value,
      cinema_id: this.selectedCinema?._id,
      movie_id: this.firstFormGroup.controls['movie'].value,
      date,
      time: this.selectedTime,
      seatNumber: this.selectedSeats,
      status: 'sold out',
      price: this.price
    }

    this.ticketService.updateTicket(id, data)
      .subscribe(res => {
        this.dialogRef.close('update');
      });
  }

  get myForm() {
    return this.firstFormGroup.controls;
  }

  onClickSeat(element: any) {
    const index = this.selectedSeats.indexOf(element.seatNumber);

    if (index > -1) {
      this.selectedSeats.splice(index, 1);
      this.price -= element.price;
      return;
    }

    if (this.selectedSeats.length < this.firstFormGroup.controls['numOfPeople'].value) {
      this.selectedSeats.push(element.seatNumber);
      this.price += element.price;
    }
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }

}
