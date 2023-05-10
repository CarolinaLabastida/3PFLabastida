import { Component, Inject } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


const MY_DATE_FORMAT = {
  parse: {
    dateInput: 'DD/MM/YYYY', 
  },
  display: {
    dateInput: 'DD/MM/YYYY', 
    monthYearLabel: 'MMMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY'
  }
};

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss'],
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'es-MX'},
    { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
{ provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
  ]
})

export class CreateUpdateComponent {
  nameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(2),
  ]);

  startDateControl = new FormControl('', [
    Validators.required
  ]);

  endDateControl = new FormControl('', [
    Validators.required
  ]);

  timeControl = new FormControl('', [
    Validators.required
  ]);

  courseForm = new FormGroup({
    name: this.nameControl,
    startDate: this.startDateControl,
    endDate: this.endDateControl,
    time: this.timeControl,
  })

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if(data){
      const courseData = data.course;
      this.nameControl.setValue(courseData.name);
      this.startDateControl.setValue(courseData.startDate);
      this.endDateControl.setValue(courseData.endDate);
      this.timeControl.setValue(courseData.time);
    }
  }

  save(): void{
    if(this.courseForm.valid){
      this.dialogRef.close(this.courseForm.value)
    } else{
      this.courseForm.markAllAsTouched();
    }
  }
}
