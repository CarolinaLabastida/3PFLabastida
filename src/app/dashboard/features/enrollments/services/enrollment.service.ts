import { Injectable } from '@angular/core';
import { Enrollment, EnrollmentModel, formDataEnrollment } from '../models/enrollment';
import { BehaviorSubject, Observable, map } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {

  private enrollments$ = new BehaviorSubject<EnrollmentModel[] | null>(
    null
  );

  constructor(private httpClient: HttpClient){

  }

  getEnrollments(): Observable<EnrollmentModel[] | null> {
    this.httpClient.get<EnrollmentModel[]>(
      `${environment.apiBaseUrl}/enrollments?_expand=course&_expand=student`
    ).subscribe({
      next: (enrollments) => {
        this.enrollments$.next(enrollments);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrió un error al obtener la información';
      }
    })

    return this.enrollments$.asObservable();
  }

  getEnrollmentById(id: number): Observable<EnrollmentModel | null>{
    return this.httpClient.get<EnrollmentModel[]>(
      `${environment.apiBaseUrl}/enrollments?id=${id}&_expand=course&_expand=student`, 
    ).pipe(
      map((enrollments) => enrollments[0])
    )
  }

  createEnrollment(newEnrollment: formDataEnrollment): void{
    this.httpClient.post<Enrollment[]>(
      `${environment.apiBaseUrl}/enrollments`, 
      {...newEnrollment, date: new Date()}
    ).subscribe({
      next: () => {
        this.getEnrollments();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al registrar la inscripción','error')
      }
    })
  }

  editEnrollment(enrollmentId: number, modifiedEnrollment: formDataEnrollment, date: Date): void{
    this.httpClient.put<Enrollment[]>(
      `${environment.apiBaseUrl}/enrollments/${enrollmentId}`, {...modifiedEnrollment, date: date}
    ).subscribe({
      next: () => {
        this.getEnrollments();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al modificar la inscripción', 'error')
      }
    })
  }

  deleteEnrollment(enrollmentId: number): void {
    this.httpClient.delete<Enrollment[]>(
      `${environment.apiBaseUrl}/enrollments/${enrollmentId}`
    ).subscribe({
      next: () => {
        this.getEnrollments();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar la inscripción', 'error')
      }
    })
  }

}
