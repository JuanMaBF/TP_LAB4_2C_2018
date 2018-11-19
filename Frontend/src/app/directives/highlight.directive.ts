import { Directive, ElementRef, Input, OnInit } from '@angular/core';

@Directive({ 
    selector: '[Highlight]' 
})
export class HighlightDirective implements OnInit{

    @Input() highlightColor: boolean;

    constructor(public el: ElementRef) {
    }

    ngOnInit(): void {
        if(this.highlightColor) {
            this.el.nativeElement.style.backgroundColor = 'yellow';
        }
    }

}