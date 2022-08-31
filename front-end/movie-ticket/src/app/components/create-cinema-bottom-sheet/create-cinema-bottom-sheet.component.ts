import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { CinemaService } from 'src/app/services/cinema.service';

@Component({
  selector: 'app-create-cinema-bottom-sheet',
  templateUrl: './create-cinema-bottom-sheet.component.html',
  styleUrls: ['./create-cinema-bottom-sheet.component.scss']
})
export class CreateCinemaBottomSheetComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<CreateCinemaBottomSheetComponent>,
    private cinemaService: CinemaService,
  ) { }

  name = new FormControl('', Validators.required);
  formData!: FormGroup;

  ngOnInit(): void {
    this.formData = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onClickCreateCinema(data: any) {
    this.cinemaService.createCinema(data.name).subscribe( res => {
      this.dialogRef.close("create");
    });
  }

  openLink(event: MouseEvent) {
    this.dialogRef.close();
    event.preventDefault()
  }

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('email') ? 'Not a valid email' : '';
  }

}
