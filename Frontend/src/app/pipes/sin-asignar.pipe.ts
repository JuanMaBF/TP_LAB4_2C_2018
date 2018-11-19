import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'sinAsignar'
})
export class SinAsignarPipe implements PipeTransform {

  transform(value: string, args: any): any {
    if(args == 'Pendiente') {
      return 'form-control fc-err';
    }
    return value;
  }
  
}