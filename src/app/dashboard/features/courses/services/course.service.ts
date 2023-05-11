import { Injectable } from '@angular/core';
import { Course, formDataCourse } from '../models/course';
import { BehaviorSubject, Observable, take, map, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environments';
import { Student } from '../../students/models/student';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  private courses$ = new BehaviorSubject<Course[] | null>(
    null
  );

  private course$ = new BehaviorSubject<Course | null>(
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
    this.httpClient.get<Course[]>(
      `${environment.apiBaseUrl}/courses`, 
      {
        params: {
          id: id
        }
      }
    ).subscribe({
      next: (courses) => {
        this.course$.next(courses[0]);
      },
      complete: () => {},
      error: () => {
        return 'Ocurrió un error al obtener la información';
      }
    })

    return this.course$.asObservable();
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


}
