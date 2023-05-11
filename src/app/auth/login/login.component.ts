import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { LoginFormValue } from 'src/app/core/models/user';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  emailControl = new FormControl('', [Validators.required, Validators.email]);
  passwordControl = new FormControl('', [Validators.required]);

  loginForm = new FormGroup({
    email: this.emailControl,
    password: this.passwordControl
})

  constructor(private authService: AuthService){

  }

  onSubmit(): void {
    if(this.loginForm.invalid){
      this.loginForm.markAllAsTouched();
    }else{
    this.authService.login(this.loginForm.value as LoginFormValue)
    }
  }
}
