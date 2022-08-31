import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MovieService } from 'src/app/services/movie.service';

@Component({
  selector: 'app-movie-update',
  templateUrl: './movie-update.component.html',
  styleUrls: ['./movie-update.component.scss']
})
export class MovieUpdateComponent implements OnInit {


  constructor(
    private dialogRef: MatDialogRef<MovieUpdateComponent>,
    private movieService: MovieService,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }
  
  profileImage: any = `${this.data.profile}` || '';
  imgFile: any;
  confirmView: Boolean = false;
  formData!: FormGroup;

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
      profile: new FormControl(''),
      year: new FormControl(this.data.year),
      rating: new FormControl(this.data.rating),
      time: new FormControl(this.data.time),
    });
    console.log(this.data);
  }
  onClickUpdateMovie() {
    if (this.confirmView == true) {
      const id = this.data._id;
      const formData = new FormData();
      formData.append('code', this.formData.controls['code'].value);
      formData.append('name', this.formData.controls['name'].value);
      formData.append('profile', this.imgFile);
      formData.append('year', this.formData.controls['year'].value);
      formData.append('rating', this.formData.controls['rating'].value);
      formData.append('time', this.formData.controls['time'].value);
      this.movieService.updateMovie(id, formData)
        .subscribe(res => {
          this.dialogRef.close('update');
        });
    }
    if (this.formData.valid) {
      this.formData.controls['code'].disable();
      this.formData.controls['name'].disable();
      this.formData.controls['profile'].disable();
      this.formData.controls['year'].disable();
      this.formData.controls['rating'].disable();
      this.formData.controls['time'].disable();
      this.confirmView = true;
    }
  }
  public Onclear() {
    if (this.formData.valid) {
      this.formData.controls['code'].disable();
      this.formData.controls['name'].disable();
      this.formData.controls['profile'].disable();
      this.formData.controls['year'].disable();
      this.formData.controls['rating'].disable();
      this.formData.controls['time'].disable();
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
