import { Injectable } from '@angular/core';
import { Course, formDataCourse } from '../models/course';
import { BehaviorSubject, Observable, take, map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Student } from '../../students/models/student';
import Swal from 'sweetalert2';
import { EnrollmentModel } from '../../enrollments/models/enrollment';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses$ = new BehaviorSubject<Course[] | null>(
    null
  );

  private enrollments$ = new BehaviorSubject<EnrollmentModel[] | null>(
    null
  );

  constructor(private httpClient: HttpClient){
  }

  getCourses(): Observable<Course[] | null> {
    this.httpClient.get<Course[]>(
      `${environment.apiBaseUrl}/courses`
    ).subscribe({
      next: (courses) => {
        this.courses$.next(courses);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrió un error al obtener la información';
      }
    })

    return this.courses$.asObservable();
  }

  getCourseById(id: number): Observable<Course | null>{
    return this.httpClient.get<Course[]>( 
      `${environment.apiBaseUrl}/courses`,
      {
        params: {
          id: id
        }
      }
    ).pipe(
      map((courses) => courses[0])
    )
  }
  

  createCourse(newCourse: formDataCourse): void{
    this.httpClient.post<Student[]>(
      `${environment.apiBaseUrl}/courses`, newCourse
    ).subscribe({
      next: () => {
        this.getCourses();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al registrar el curso','error')
      }
    })
  }

  editCourse(courseId: number,modifiedCourse: formDataCourse): void{
    this.httpClient.put<Student[]>(
      `${environment.apiBaseUrl}/courses/${courseId}`, modifiedCourse
    ).subscribe({
      next: () => {
        this.getCourses();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al modificar el curso', 'error')
      }
    })
  }

  deleteCourse(courseId: number): void {
    this.httpClient.delete<Course[]>(
      `${environment.apiBaseUrl}/courses/${courseId}`
    ).subscribe({
      next: () => {
        this.getCourses();
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar el curso', 'error')
      }
    })
  }

  getEnrollmentsByCourseId(id: number): Observable<EnrollmentModel[] | null> {
    this.httpClient.get<EnrollmentModel[]>(
      `${environment.apiBaseUrl}/enrollments?courseId=${id}&_expand=course&_expand=student`, 
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
        this.getEnrollmentsByCourseId(courseId);
      },
      complete: () => {},
      error: () => {
        Swal.fire('', 'Ocurrió un error al eliminar la inscripción', 'error')
      }
    })
  }

}
