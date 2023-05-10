import { Pipe, PipeTransform } from '@angular/core';
import { Student } from 'src/app/dashboard/features/students/models/student';

@Pipe({
  name: 'fullName'
})
export class FullNamePipe implements PipeTransform {


  transform(value: Student | undefined, ...args: unknown[]): unknown {
    if(value){
      const fullName = `${value.name} ${value.lastName}`;
      return fullName;  
    }
    else{
        return "";
    }
  }

}
