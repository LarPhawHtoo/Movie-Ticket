import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { TicketService } from 'src/app/services/ticket.service';
import { MatTableDataSource } from '@angular/material/table';
import { SeatService } from 'src/app/services/seat.service';
import { MatDialogRef } from '@angular/material/dialog';
import { Movie } from 'src/app/interfaces/movie.model';
import { MovieService } from 'src/app/services/movie.service';
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
  selector: 'app-create-ticket-dialog',
  templateUrl: './create-ticket-dialog.component.html',
  styleUrls: ['./create-ticket-dialog.component.scss'],
  providers: [
    { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})
export class CreateTicketDialogComponent implements OnInit {

  constructor(
    private fb: FormBuilder,
    private seatService: SeatService,
    private ticketService: TicketService,
    private movieService: MovieService,
    private dialogRef: MatDialogRef<CreateTicketDialogComponent>
  ) { 
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();
    const currentDay = new Date().getDate();
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 10);
  }

  times: string[] = [];
  numOfPeople: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  seats: any[] = [];
  selectedSeats: string[] = [];
  price: number = 0;
  selectedCinema!: any;
  selectedMovie: string = '';
  selectedTime: string = '';
  minDate = new Date();
  maxDate!: Date;
  loading = false;

  movieDataSource = new MatTableDataSource<Movie>;
  movies: Movie[] = [];

  firstFormGroup!: FormGroup;
  secondFormGroup!: FormGroup;

  loggedInUser: any;

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(localStorage.getItem('loginUser') || '');

    this.movieService.getNowShowingMovies().subscribe((response: any) => {
      this.movieDataSource.data = response.movies as Movie[];

      for (let i = 0; i < this.movieDataSource.data.length; i++) {
        this.movies.push(this.movieDataSource.data[i]);
      }
    });

    console.log(this.movies)

    this.firstFormGroup = this.fb.group({
      customerName: new FormControl('', Validators.required),
      movie: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      numOfPeople: new FormControl('', Validators.required)
    });

    this.secondFormGroup = this.fb.group({
      time: new FormControl('', Validators.required)
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
      price: this.price,
      created_user_id: this.loggedInUser._id
    }

    this.ticketService.addTicket(data)
      .subscribe(res => {
        this.dialogRef.close('create');
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
