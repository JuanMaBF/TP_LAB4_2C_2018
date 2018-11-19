import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'vinoTinto'
})
export class VinoTintoPipe implements PipeTransform {

  public transform(value: string, args: string[]): any {
    if (value == 'Vino tinto') {
        return value + '🍷';
    } 
    return value;
  }

}