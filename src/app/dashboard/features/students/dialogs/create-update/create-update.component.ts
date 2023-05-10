import { Component, Inject } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

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
    Validators.minLength(3),
  ]);

  lastNameControl = new FormControl('', [
    Validators.required,
    Validators.minLength(3),
  ]);

  emailControl = new FormControl('', [Validators.required, Validators.email]);

  phoneControl = new FormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]{10}$'),
  ]);

  birthDateControl = new FormControl('', [
    Validators.required,
    this.dateValidator(),
  ]);

  genderControl = new FormControl('');

  studentForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    phone: this.phoneControl,
      birthDate: this.birthDateControl,
      gender: this.genderControl
  });

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if (data) {
      const studentData = data.student;
      this.nameControl.setValue(studentData.name);
      this.lastNameControl.setValue(studentData.lastName);
      this.emailControl.setValue(studentData.email);
      this.phoneControl.setValue(studentData.phone);
      this.birthDateControl.setValue(studentData.birthDate);
      this.genderControl.setValue(studentData.gender);
    }
  }

  save(): void{
    if (this.studentForm.valid) {
      this.dialogRef.close(this.studentForm.value);
    } else {
      this.studentForm.markAllAsTouched();
    }
  }

  dateValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (
        new Date(control.value)?.getFullYear() >
          new Date().getFullYear() - 18 ||
        new Date(control.value)?.getFullYear() < new Date().getFullYear() - 100
      ) {
        return {
          dateInvalid: true,
        };
      }
      return null;
    };
  }
}
