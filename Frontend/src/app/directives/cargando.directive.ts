import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({ 
    selector: '[CargandoDir]' 
})
export class CargandoDirective {

    constructor(public el: ElementRef) {
    }

    @HostListener('click') onClick() {
        let original = this.el.nativeElement.innerText;
        this.el.nativeElement.innerText = 'Descargando...';
        setTimeout(()=>{
            this.el.nativeElement.innerText = 'Descargando.';
        }, 500);
        setTimeout(()=>{
            this.el.nativeElement.innerText = 'Descargando..';
        }, 1000);
        setTimeout(()=>{
            this.el.nativeElement.innerText = 'Descargando...';
        }, 1500);
        setTimeout(()=>{
            this.el.nativeElement.innerText = original;
        }, 2000);
    }
}