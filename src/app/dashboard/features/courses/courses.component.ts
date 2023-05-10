import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Course } from './models/course';
import { Subscription } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CourseService } from './services/course.service';
import { NotificationsService } from '../../../core/services/notifications.service';
import Swal from 'sweetalert2';
import { CreateUpdateComponent } from './dialogs/create-update/create-update.component';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-courses',
  templateUrl: './courses.component.html',
  styleUrls: ['./courses.component.scss']
})
export class CoursesComponent implements OnInit, OnDestroy {
  dataSource = new MatTableDataSource<Course>();
  subscriptionRef: Subscription | null;

  displayedColumns: string[] = [
    'actions',
    'id',
    'name',
    'startDate',
    'endDate',
    'time',
  ];

  constructor(
    public dialog: MatDialog,
    private courseService: CourseService,
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
    this.courseService.getCourses()
    .subscribe({
      next: (courses) => {if (courses) this.dataSource.data = courses},
      error: (e) => console.error(e),
    })
  }

  ngOnDestroy(): void {
    this.subscriptionRef?.unsubscribe();
  }

  removeData(course: Course){
    this.courseService.deleteCourse(course.id);
    this.notificationsService.createMessage(`El curso ${course.name} ha sido eliminado`);
  }

  openCreateCourseDialog(): void{
    const dialogRef = this.dialog.open(CreateUpdateComponent);
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData){
        this.courseService.createCourse(formData);
        this.notificationsService.createMessage(`El curso ${formData.name} ha sido sido creado`);
      }
    });
  }

  editData(course: Course): void {
    const dialogRef = this.dialog.open(CreateUpdateComponent, {
      data: {
        course
      },
    });
    dialogRef.afterClosed().subscribe((formData) => {
      if(formData) {
        this.courseService.editCourse(course.id,formData);
        this.notificationsService.createMessage(`El curso ${formData.name} ha sido modificado`);
      }
    });
  }

  showDetails(courseId: number): void {
    this.router.navigate([courseId], {
      relativeTo: this.activatedRoute
    })
  }

}
