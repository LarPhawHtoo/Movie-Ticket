import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CinemaService } from 'src/app/services/cinema.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-cinema-update',
  templateUrl: './cinema-update.component.html',
  styleUrls: ['./cinema-update.component.scss']
})
export class CinemaUpdateComponent implements OnInit {

  constructor(
    private cinemaService: CinemaService,
    private dialogRef: MatDialogRef<CinemaUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: CinemaUpdateComponent,
  ) { }

  name = new FormControl('', Validators.required);
  formData!: FormGroup;
  _id: string = '';

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl(this.data.name, Validators.required)
    });
  }

  onClickUpdateCinema() {
    const cinemaId = this.data._id;
    const formData = new FormData();

    formData.append('name', this.formData.controls['name'].value);

    this.cinemaService.updateCinema(cinemaId, formData)
    .subscribe(res => {
      this.dialogRef.close('update');
    });
  }

  onCancelClick() {
    this.dialogRef.close();
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('email') ? 'Not a valid email' : '';
  }

}
