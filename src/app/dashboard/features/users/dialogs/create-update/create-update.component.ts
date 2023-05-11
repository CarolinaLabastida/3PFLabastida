import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent {
  hide = true;
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
    Validators.pattern('^[0-9]{10}$'),
  ]);

  roleControl = new FormControl('', Validators.required);

  passwordControl = new FormControl('', [
    Validators.required,
    Validators.minLength(5),
    Validators.maxLength(10)
  ]);

  userForm = new FormGroup({
    name: this.nameControl,
    lastName: this.lastNameControl,
    email: this.emailControl,
    phone: this.phoneControl,
    role: this.roleControl,
    password: this.passwordControl,
  });

  constructor(
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if (data) {
      const userData = data.user;
      this.nameControl.setValue(userData.name);
      this.lastNameControl.setValue(userData.lastName);
      this.emailControl.setValue(userData.email);
      this.phoneControl.setValue(userData.phone);
      this.roleControl.setValue(userData.role);
    }
  }

  save(): void{
    if (this.userForm.valid) {
      this.dialogRef.close(this.userForm.value);
    } else {
      this.userForm.markAllAsTouched();
    }
  }
}
