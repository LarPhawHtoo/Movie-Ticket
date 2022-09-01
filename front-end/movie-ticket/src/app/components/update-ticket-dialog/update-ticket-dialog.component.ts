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
    const currentDay = new Date().getDay();
    this.maxDate = new Date(currentYear, currentMonth, currentDay + 6);
  }

  _id: string = '';
  dates: string[] = ['22/08/2022', '11/08/2022', '14/08/2022', '25/08/2022', '17/08/2022'];
  times: string[] = ['10:30 AM', '1:00 PM', '2:30 PM', '3:00 PM'];
  numOfPeople: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  seats: any[] = [];
  selectedSeats: string[] = [];
  price: number = 5000;
  selectedCinema: string = '';
  selectedMovie: string = '';
  minDate = new Date();
  maxDate!: Date;
  loading = false;

  cinemaDataSource = new MatTableDataSource<Cinema>;
  cinemas: Cinema[] = [];

  movieDataSource = new MatTableDataSource<Movie>;
  movies: Movie[] = [];

  firstFormGroup!: FormGroup;

  cinema_id: any;
  customer_name: any;
  movie_id: any;
  date: any;
  time: any;

  ngOnInit(): void {
    this.cinemaService.getCinemas().subscribe((response: any) => {
      this.cinemaDataSource.data = response.data as Cinema[];

      for (let i = 0; i < this.cinemaDataSource.data.length; i++) {
        this.cinemas.push(this.cinemaDataSource.data[i]);
      }
    });

    this.movieService.getMovies().subscribe((response: any) => {
      this.movieDataSource.data = response.movies as Movie[];

      for (let i = 0; i < this.movieDataSource.data.length; i++) {
        this.movies.push(this.movieDataSource.data[i]);
      }
    });

    this.firstFormGroup = this.fb.group({
      customerName: new FormControl(this.data.customer_name, Validators.required),
      cinema: new FormControl('', Validators.required),
      movie: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      numOfPeople: new FormControl('', Validators.required)
    });
  }

  getInfo() {
    for (let cinema of this.cinemas) {
      if (cinema._id == this.firstFormGroup.controls['cinema'].value) {
        this.selectedCinema = cinema.name;
      }
    }

    for (let movie of this.movies) {
      if (movie._id == this.firstFormGroup.controls['movie'].value) {
        this.selectedMovie = movie.name;
      }
    }

    this.getSeats();
  }

  getSeats() {
    this.loading = true;
    const cinemaId = this.myForm['cinema'].value;
    const body = {
      "date": this.myForm['date'].value,
      "time": this.myForm['time'].value
    }
    this.seatService.getSeats(cinemaId, body)
      .subscribe((response: any) => {
        this.loading = false;
        this.seats = response.tickets;
    })
  }

  onClickBuy() {
    const id = this.data._id;
    const formData = new FormData();
    formData.append('customer_name', this.firstFormGroup.controls['customerName'].value);
    formData.append('cinema_id', this.firstFormGroup.controls['cinema'].value);
    formData.append('movie_id', this.firstFormGroup.controls['movie'].value);
    formData.append('date', this.firstFormGroup.controls['date'].value);
    formData.append('time', this.firstFormGroup.controls['time'].value);
    formData.append('seatNumber', `${this.selectedSeats}`);
    formData.append('status', 'sold out');
    formData.append('price', `${this.price * this.myForm['numOfPeople'].value}`);
    

    this.ticketService.updateTicket(id, formData)
      .subscribe(res => {
        this.dialogRef.close('update');
      });
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

  public hasError = (controlName: string, errorName: string) => {
    return this.firstFormGroup.controls[controlName].hasError(errorName);
  }

}
