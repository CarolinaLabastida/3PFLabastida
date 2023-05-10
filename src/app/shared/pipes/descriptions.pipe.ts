import { Pipe, PipeTransform } from '@angular/core';
import { CourseService } from '../../dashboard/features/courses/services/course.service';
import { pipe } from 'rxjs';
import { StudentService } from '../../dashboard/features/students/services/student.service';

@Pipe({
  name: 'descriptions'
})
export class DescriptionsPipe implements PipeTransform {

  constructor(
    private courseService: CourseService,
    private studentService: StudentService
  ){
  }

  transform(value: any, args: string): unknown {
    if(!value) return '';

    let defaultText: string = '';
    switch(args){
      case 'course':
        this.courseService.getCourseById(value)
        .subscribe({
          next: pipe(map => defaultText = `${map?.name}` )
        })
        break;
      case 'student':
        this.studentService.getStudentById(value)
        .subscribe({
          next: pipe(map => defaultText =  `${map?.name} ${map?.lastName}` )
        })
        break;
      default:
        defaultText = '';
    }   

    return defaultText;
  }

}
