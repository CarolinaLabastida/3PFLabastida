import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Guid } from 'guid-typescript';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { FormDataUser, User } from 'src/app/core/models/user';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private users$ = new BehaviorSubject<User[] |null>(
    null
  );

  constructor(private httpClient: HttpClient) {
   }

  getUsers(): Observable<User[] | null> {
    this.httpClient.get<User[]>(
      `${environment.apiBaseUrl}/users`
    ).subscribe({
      next: (users) => {
        this.users$.next(users);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrió un error al obtener la información';
      }
    })
    return this.users$.asObservable();
  }

  getUserById(id: number): Observable<User | null> {
    return this.httpClient.get<User[]>(
      `${environment.apiBaseUrl}/users`,
      {
        params: {
          id: id
        }
      }
    ).pipe(
      map((users) => users[0])
    )
  }

  createUser(newUser: FormDataUser): void{
    this.httpClient.post<User[]>(
      `${environment.apiBaseUrl}/users`, {...newUser, token: Guid.create().toString() }
    ).subscribe({
      next: () => {
          this.getUsers();      
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al registrar el usuario', 'error')
      }
    })
  }

  editUser(userId: number,modifiedUser: FormDataUser, token: string): void {
    this.httpClient.put<User[]>(
      `${environment.apiBaseUrl}/users/${userId}`, {...modifiedUser, token: token }
    ).subscribe({
      next: () => {
        this.getUsers();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al modificar el usuario', 'error')
      }
    })   
  }

  deleteUser(userId: number): void {

    this.httpClient.delete<User[]>(
      `${environment.apiBaseUrl}/users/${userId}`
    ).subscribe({
      next: () => {
        this.getUsers();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar el usuario', 'error')
      }
    })
  }
}
