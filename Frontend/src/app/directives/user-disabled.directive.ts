import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({ 
    selector: '[UserDisabled]' 
})
export class UserDisabledDirective implements OnInit {

    @Input() userType: string;

    constructor(public el: ElementRef) {
    }

    ngOnInit() {
        let op = this.el.nativeElement.text;
        if(this.userType == 'Mozo') {
            if(op == "En preparacion" || op == "Listo para servir") {
                this.el.nativeElement.disabled = true;
            }
        } else if(this.userType == 'CocineroCoc' 
            || this.userType == 'CocineroPost'
            || this.userType == 'Cervecero'
            || this.userType == 'Bartender') {
                if(op == "Pendiente" || op == "Terminado") {
                    this.el.nativeElement.disabled = true;
                }
            }
    }

}