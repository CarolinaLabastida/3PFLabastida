import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'controlErrorMessages'
})
export class ControlErrorMessagesPipe implements PipeTransform {

  transform(error: any, ...args: unknown[]): unknown {
    if(!error) return '';

    let defaultMsg = 'Campo inválido';
    const opciones: Record<string, string> = {
      required: 'Este campo es requerido',
      minlength: `Debe contener al menos ${error.value.requiredLength} caracteres`,
      maxlength: `Debe contener máximo ${error.value.requiredLength} caracteres`,
      email: 'Ingrese una dirección de correo electrónico válida',
      dateInvalid: 'Ingrese una fecha válida',
      pattern: error.value.requiredPattern == '^[0-9]{10}$' ? 'El campo teléfono debe contener 10 números' : defaultMsg
    }

    if(opciones[error.key]){
      defaultMsg = opciones[error.key]
    }

    return defaultMsg;
  }

}
