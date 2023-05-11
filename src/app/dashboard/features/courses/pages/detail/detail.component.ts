import { Component, OnDestroy, OnInit } from '@angular/core';
import { Course } from '../../models/course';
import { Observable, Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../../enrollments/services/enrollment.service';
import { MatTableDataSource } from '@angular/material/table';
import { Enrollment } from '../../../enrollments/models/enrollment';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy, OnInit {
  dataSource = new MatTableDataSource<Enrollment>();
  course: Course | null = null;
  subscriptionRef: Subscription | null;

  private subject$ = new Subject();

  displayedColumns: string[] = [
    'actions',
    'id',
    'student',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private notificationsService: NotificationsService,
  ){
    this.courseService.getCourseById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).subscribe((course) => this.course = course);

    this.subscriptionRef = this.notificationsService.showMessage()
    .subscribe((text) => {
      Swal.fire(text, '', 'success');
    })
  }

  ngOnInit(): void {
    console.log(this.course);
    this.enrollmentService.getEnrollmentsByCourseId(this.course?.id??0)
    .subscribe({
      next: (enrollments) => this.dataSource.data = enrollments,
      error: (e) => console.error(e),
    })
  }

  removeData(id: number){
    this.enrollmentService.deleteEnrollment(id);
    this.notificationsService.createMessage('El alumno se ha desinscrito del curso')
  }


  ngOnDestroy(): void {
    this.subject$.next(true);
    this.subscriptionRef?.unsubscribe();
  }
}
