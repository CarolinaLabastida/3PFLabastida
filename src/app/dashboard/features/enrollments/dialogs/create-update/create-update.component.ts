import { Component, Inject, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Course } from '../../../courses/models/course';
import { Student } from '../../../students/models/student';
import { StudentService } from '../../../students/services/student.service';
import { CourseService } from '../../../courses/services/course.service';

@Component({
  selector: 'app-create-update',
  templateUrl: './create-update.component.html',
  styleUrls: ['./create-update.component.scss']
})
export class CreateUpdateComponent implements OnInit {
  coursesList: Course[] | null = null;
  studentsList: Student[] | null = null;
  
  courseIdControl = new FormControl('', [
    Validators.required
  ]);

  studentIdControl = new FormControl('', [
    Validators.required
  ]);


  enrollmentForm = new FormGroup({
    courseId: this.courseIdControl,
    studentId: this.studentIdControl
  })

  constructor(
    private studentService: StudentService,
    private courseService: CourseService,
    public dialogRef: MatDialogRef<CreateUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    if(data){
      const enrollmentData = data.enrollment;
      this.courseIdControl.setValue(enrollmentData.courseId);
      this.studentIdControl.setValue(enrollmentData.studentId);
    }
  }

  ngOnInit(): void {
    this.studentService.getStudents() 
    .subscribe({
      next: (students) => this.studentsList = students,
      error: (e) => console.error(e),
    })

    this.courseService.getCourses() 
    .subscribe({
      next: (courses) => this.coursesList = courses,
      error: (e) => console.error(e),
    })

  }

  save(): void{
    if(this.enrollmentForm.valid){
      this.dialogRef.close(this.enrollmentForm.value)
    } else{
      this.enrollmentForm.markAllAsTouched();
    }
  }
}

