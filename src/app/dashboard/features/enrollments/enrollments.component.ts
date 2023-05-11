import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Enrollment, EnrollmentModel } from './models/enrollment';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { EnrollmentService } from './services/enrollment.service';
import { NotificationsService } from 'src/app/core/services/notifications.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-enrollments',
  templateUrl: './enrollments.component.html',
  styleUrls: ['./enrollments.component.scss']
})
export class EnrollmentsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<EnrollmentModel>();
  subscriptionRef: Subscription | null;

  displayedColumns: string[] = [
    'actions',
    'id',
    'course',
    'student',
    'date',
  ];

  constructor(
    public dialog: MatDialog,
    private enrollmentService: EnrollmentService,
    private notificationsService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ){
    this.subscriptionRef = this.notificationsService.showMessage()
    .subscribe((text) => {
      Swal.fire(text, '', 'success');
    })
  }

  ngOnInit(): void {
    this.enrollmentService.getEnrollments()
    .subscribe({
      next: (enrollments) => {
        if(enrollments) this.dataSource.data = enrollments
      },
      error: (e) => console.error(e),
    })
  }

  ngOnDestroy(): void {
    this.subscriptionRef?.unsubscribe();
  }

  removeData(enrollment: Enrollment){
    this.enrollmentService.deleteEnrollment(enrollment.id);
    this.notificationsService.createMessage(`La inscripción ha sido eliminada`);
  }

  openCreateEnrollmentDialog(): void{
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData){
        this.enrollmentService.createEnrollment(formData);
        this.notificationsService.createMessage(`La inscripción ha sido sido creada`);
      }
    });
  }

  editData(enrollment: Enrollment): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        enrollment
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData) {
        this.enrollmentService.editEnrollment(enrollment.id, formData, enrollment.date);
        this.notificationsService.createMessage(`La inscripción ha sido modificada`);
      }
    });
  }

  showDetails(enrollmentId: number): void {
    this.router.navigate([enrollmentId], {
      relativeTo: this.activatedRoute
    })
  }
}

