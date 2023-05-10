import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from './models/student';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { StudentService } from './services/student.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Student>();
  subscriptionRef: Subscription | null;

  displayedColumns: string[] = [
    'actions',
    'id',
    'fullName',
    'email',
    'phone',
    'birthDate',
    'gender',
  ];

  constructor(
    public dialog: MatDialog,
    private studentService: StudentService,
    private notificationsService: NotificationsService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.subscriptionRef = this.notificationsService.showMessage().subscribe((text) => {
      Swal.fire( text, '', 'success');
    })
  }

  ngOnInit(): void {
    this.studentService.getStudents() 
    .subscribe({
      next: (students) => {
        if(students) this.dataSource.data = students
      },
      error: (e) =>  Swal.fire( e, '', 'error'),
    })

  }

  ngOnDestroy(): void {
    this.subscriptionRef?.unsubscribe();
  }

  removeData(student: Student) {
    this.studentService.deleteStudent(student.id);
    this.notificationsService.createMessage(`${student.name} ha sido eliminado(a)`);
  }

  openCreateStudentDialog(): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.studentService.createStudent(formData);
        this.notificationsService.createMessage(`${formData.name} ha sido sido creado(a)`);
      }
    });
  }

  editData(student: Student): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        student
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if (formData) {
        this.studentService.editStudent(student.id, formData)
        this.notificationsService.createMessage(`${formData.name} ha sido modificado(a)`);
      }
    });
  }

  showDetails(studentId: number): void {
    this.router.navigate([studentId], {
      relativeTo: this.activatedRoute
    })
  }
}
