import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'mayuscula'
})
export class MayusculaPipe implements PipeTransform {

  transform(value: string, args: string[]): any {
    if(value == 'Vino blanco') {
      return value.toLocaleUpperCase();
    }
    return value;
  }
  
}