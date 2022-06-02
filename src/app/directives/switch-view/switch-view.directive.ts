import {
    Directive,
    ElementRef,
    HostListener,
} from '@angular/core';

@Directive({
    selector: '[appSwitchView]',
})
export class SwitchViewDirective {
    constructor(private el: ElementRef) { }

    @HostListener('click', ['$event.target'])
    onClick() {
        this.hide();
    }

    private hide() {
        this.el.nativeElement.style.display = 'none';
    }
}
