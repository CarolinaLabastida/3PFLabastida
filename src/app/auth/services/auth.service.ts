import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, catchError, map, throwError } from 'rxjs';
import { LoginFormValue, User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private authUser$ = new BehaviorSubject<User | null>(null);

  constructor(
    private router: Router,
    private httpClient: HttpClient
  ) { }

  getUser(): Observable<User | null> {
    return this.authUser$.asObservable();
  }

  login(formValue: LoginFormValue): void {
    this.httpClient.get<User[]>(
      `${environment.apiBaseUrl}/users`,
      {
        params: {
          ...formValue
        }
      }
    ).subscribe({
      next: (users) => {
        const userAuth = users[0];
        if(userAuth) {
          localStorage.setItem('token', userAuth.token)
          localStorage.setItem('role', userAuth.role)
          this.authUser$.next(userAuth)
          this.router.navigate(['sistema','inicio'])
        }else{
          Swal.fire('', 'Usuario y/o contraseña incorrectos', 'error')
        }
      }
    })
  }

  logout(): void {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    this.authUser$.next(null);
    this.router.navigate(['auth']);
  }

  validateToken(): Observable<boolean> {
    const token = localStorage.getItem('token');
    return this.httpClient.get<User[]>(
      `${environment.apiBaseUrl}/users?token=${token}`,
    )
    .pipe(
      map((users) => {
        const userAuth = users[0];
        if(userAuth){
          this.authUser$.next(userAuth);
        }
        return !!userAuth;
      }),
      catchError((error) => {
        Swal.fire('', 'Ocurrió un error al obtener la información. No es posible cargar el sitio', 'error');
        return throwError(() => error);
      })
    )
  }
}
