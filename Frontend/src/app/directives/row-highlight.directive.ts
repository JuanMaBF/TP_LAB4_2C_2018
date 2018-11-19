import { Directive, ElementRef, Input, OnInit, HostListener } from '@angular/core';

@Directive({ 
    selector: '[RowHighlight]' 
})
export class RowHighlightDirective{

    @Input() highlightColor: boolean;

    constructor(public el: ElementRef) {
    }

    @HostListener('mouseenter') onMouseEnter() {
        this.highlight('#d0d3d6');
    }

    @HostListener('mouseleave') onMouseLeave() {
        this.highlight(null);
    }

    private highlight(color: string) {
        this.el.nativeElement.style.backgroundColor = color;
    }

}