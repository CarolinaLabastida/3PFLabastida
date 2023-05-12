import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { LoginFormValue, User } from 'src/app/core/models/user';
import { Router } from '@angular/router';
import { skip } from 'rxjs';
import {
    HttpClientTestingModule,
    HttpTestingController,
  } from '@angular/common/http/testing'
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

describe('Pruebas en AuthService', () => {
  let service: AuthService;
  let httpController: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
    }).compileComponents();

    service = TestBed.inject(AuthService);
    httpController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('El login debe funcionar', (done) => {
    const loginTest: LoginFormValue = {
        email: 'admin@email.com',
        password: '12345678'
    };

    const requestResult: User[] = [
        {
            id: 1,
            name: "Carolina",
            lastName: "Labastida",
            email: loginTest.email,
            phone: "8331234567",
            role: "Administrador",
            password: loginTest.password,
            token: "67674d30-96b8-323d-0823-ce6d4c4f7931"
        }
    ];

    spyOn(TestBed.inject(Router), 'navigate');
    service.getUser()
    .pipe(skip(1))
    .subscribe((user) => {
        expect(user).toEqual(requestResult[0]);
        done();
    })
    service.login(loginTest);

    httpController.expectOne({
        url: `${environment.apiBaseUrl}/users?email=${loginTest.email}&password=${loginTest.password}`,
        method: 'GET'
    })
    .flush(requestResult);
  });

  it('Si el login es inválido debe mostrarse un mensaje de error',
  () => {
    const loginTest: LoginFormValue = {
        email: 'admin@email.com',
        password: '12345678'
    };

    const spyOnSwal =  spyOn(Swal, 'fire');
    service.login(loginTest);
    httpController.expectOne({
        url: `${environment.apiBaseUrl}/users?email=${loginTest.email}&password=${loginTest.password}`,
        method: 'GET'
    })
    .flush('');
   
    expect(spyOnSwal).toHaveBeenCalled();
  })

  it('Al cerrar sesión se debe emitir un authUser null, remover el token y el rol del localStorage y redireccionar al login',
  () => {
    const spyOnNavigate = spyOn(TestBed.inject(Router), 'navigate');

    service.logout();
    const token = localStorage.getItem('token');
    const role = localStorage.getItem('role');

    expect(token).toBeNull();
    expect(role).toBeNull();
    expect(spyOnNavigate).toHaveBeenCalled();
  }
  )

});