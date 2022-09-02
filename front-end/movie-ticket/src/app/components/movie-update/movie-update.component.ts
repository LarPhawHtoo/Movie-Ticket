import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';
import { Cinema } from 'src/app/interfaces/cinema.model';
import { MatTableDataSource } from '@angular/material/table';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<MovieUpdateComponent>,
    private movieService: MovieService,
    private cinemaService: CinemaService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  
  profileImage: any = `${this.data.profile}` || '';
  imgFile: any;
  confirmView: Boolean = false;
  formData!: FormGroup;
  times: string[] = ['10:30 AM', '1:00 PM', '2:30 PM', '3:00 PM'];
  cinemaDataSource = new MatTableDataSource<Cinema>;
  cinemas: Cinema[] = [];
  statuses: string[] = ['Coming Soon', 'Now Showing'];

  code= new FormControl('', [Validators.required])
  name= new FormControl('', Validators.required)
  profile = new FormControl('')
  year= new FormControl('')
  rating= new FormControl('')
  time= new FormControl('', Validators.required)
  ngOnInit(): void {
    this.formData = new FormGroup({
      code: new FormControl(this.data.code, Validators.required),
      name: new FormControl(this.data.name, Validators.required),
      poster: new FormControl(''),
      year: new FormControl(this.data.year),
      rating: new FormControl(this.data.rating),
      cinema: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required),
      status: new FormControl('', Validators.required)
    });
    
    this.cinemaService.getCinemas().subscribe((response: any) => {
      this.cinemaDataSource.data = response.data as Cinema[];

      for (let i = 0; i < this.cinemaDataSource.data.length; i++) {
        this.cinemas.push(this.cinemaDataSource.data[i]);
      }
    });
  }
  onClickUpdateMovie() {
    if (this.confirmView == true) {
      const id = this.data._id;
      const formData = new FormData();
      formData.append('code', this.formData.controls['code'].value);
      formData.append('name', this.formData.controls['name'].value);
      formData.append('image', this.imgFile);
      formData.append('year', this.formData.controls['year'].value);
      formData.append('rating', this.formData.controls['rating'].value);
      formData.append('cinema_id', this.formData.controls['cinema'].value);
      formData.append('time', this.formData.controls['time'].value);
      formData.append('status', this.formData.controls['status'].value);
      this.movieService.updateMovie(id, formData)
        .subscribe(res => {
          this.dialogRef.close('update');
        });
    }
    if (this.formData.valid) {
      this.formData.controls['code'].disable();
      this.formData.controls['name'].disable();
      this.formData.controls['poster'].disable();
      this.formData.controls['year'].disable();
      this.formData.controls['rating'].disable();
      this.formData.controls['time'].disable();
      this.formData.controls['status'].disable();
      this.confirmView = true;
    }
  }
  
  public onClear() {
    if (this.confirmView === true) {
      this.formData.controls['profile'].enable();
      this.formData.controls['fullName'].enable();
      this.formData.controls['type'].enable();
      this.formData.controls['phone'].enable();
      this.formData.controls['email'].enable();
      this.formData.controls['dob'].enable();
      this.formData.controls['address'].enable();
      this.formData.controls['password'].enable();
      this.formData.controls['confirmPwd'].enable();
      this.confirmView = false;
    } else {
      this.formData.reset();
    }
  }

  imageUpload(event: any) {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      this.imgFile = file;
      const reader = new FileReader();
      reader.onload = e => this.profileImage = reader.result;
      reader.readAsDataURL(file);
    }
  }

  get myForm() {
    return this.formData.controls;
  }

  public hasError = (controlName: string, errorName: string) => {
    return this.formData.controls[controlName].hasError(errorName);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }
}
