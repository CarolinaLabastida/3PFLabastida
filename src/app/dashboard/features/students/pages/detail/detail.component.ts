import { Component, OnDestroy, OnInit } from '@angular/core';
import { Student } from '../../models/student';
import { Subject, Subscription, takeUntil } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { StudentService } from '../../services/student.service';
import { EnrollmentService } from '../../../enrollments/services/enrollment.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import { Enrollment } from '../../../enrollments/models/enrollment';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnDestroy, OnInit {
  dataSource = new MatTableDataSource<Enrollment>();
  student: Student | undefined;
  subscriptionRef: Subscription | null;

  private subject$ = new Subject();

  displayedColumns: string[] = [
    'actions',
    'id',
    'course',
  ];

  constructor(
    private activatedRoute: ActivatedRoute,
    private studentService: StudentService,
    private enrollmentService: EnrollmentService,
    private notificationsService: NotificationsService,
  ){
    this.studentService.getStudentById(
      parseInt(this.activatedRoute.snapshot.params['id'])
    ).pipe(takeUntil(this.subject$))
    .subscribe((student) => {if(student) this.student = student});

    this.subscriptionRef = this.notificationsService.showMessage()
    .subscribe((text) => {
      Swal.fire(text, '', 'success');
    })
  }

  ngOnInit(): void {
    this.enrollmentService.getEnrollmentsByStudentId(this.student?.id??0)
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
