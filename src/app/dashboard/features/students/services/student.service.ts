import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, map, take } from 'rxjs';
import { FormDataStudent, Student } from '../models/student';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import Swal from 'sweetalert2';
import { Enrollment, EnrollmentModel } from '../../enrollments/models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class StudentService {

  private students$ = new BehaviorSubject<Student[] |null>(
    null
  );

  private enrollments$ = new BehaviorSubject<EnrollmentModel[] | null>(
    null
  );


  constructor(private httpClient: HttpClient) {
   }

  getStudents(): Observable<Student[] | null> {
    this.httpClient.get<Student[]>(
      `${environment.apiBaseUrl}/students`
    ).subscribe({
      next: (students) => {
        this.students$.next(students);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrió un error al obtener la información';
      }
    })
    return this.students$.asObservable();
  }

  getStudentById(id: number): Observable<Student | null> {
    return this.httpClient.get<Student[]>(
      `${environment.apiBaseUrl}/students`,
      {
        params: {
          id: id
        }
      }
    ).pipe(
      map((students) => students[0])
    )
  }

  createStudent(newStudent: FormDataStudent): void{
    this.httpClient.post<Student[]>(
      `${environment.apiBaseUrl}/students`, newStudent
    ).subscribe({
      next: () => {
          this.getStudents();      
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al registrar el alumno', 'error')
      }
    })
  }

  editStudent(studentId: number,modifiedStudent: FormDataStudent): void {
    this.httpClient.put<Student[]>(
      `${environment.apiBaseUrl}/students/${studentId}`, modifiedStudent
    ).subscribe({
      next: () => {
        this.getStudents();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al modificar el alumno', 'error')
      }
    })   
  }

  deleteStudent(studentId: number): void {

    this.httpClient.delete<Student[]>(
      `${environment.apiBaseUrl}/students/${studentId}`
    ).subscribe({
      next: () => {
        this.getStudents();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar el alumno', 'error')
      }
    })
  }

  getEnrollmentsByStudentId(id: number): Observable<EnrollmentModel[] | null> {
    this.httpClient.get<EnrollmentModel[]>(
      `${environment.apiBaseUrl}/enrollments?studentId=${id}&_expand=course&_expand=student`, 
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

  deleteEnrollment(enrollmentId: number, courseId: number): void {
    this.httpClient.delete(
      `${environment.apiBaseUrl}/enrollments/${enrollmentId}`
    ).subscribe({
      next: () => {
        this.getEnrollmentsByStudentId(courseId);
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar la inscripción', 'error')
      }
    })
  }
}
