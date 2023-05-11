import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'activatedRoute'
})
export class ActivatedRoutePipe implements PipeTransform {

  transform(route: string, ...args: unknown[]): unknown {

    let text = '';
    if(route.indexOf("/sistema/alumnos") >= 0){
      text = 'Alumnos';
    }else if(route.indexOf("/sistema/cursos") >= 0){
      text = 'Cursos';
    }else if(route.indexOf("/sistema/usuarios") >= 0){
      text = 'Usuarios';
    }else if(route.indexOf("/sistema/inscripciones") >= 0){
      text = 'Inscripciones';
    }else{
      text = 'Inicio';
    }

    return text;
  }

}
