import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-switch-view-button',
    templateUrl: './switch-view-button.component.html',
    styleUrls: ['./switch-view-button.component.scss'],
})
export class SwitchViewButtonComponent {
    @Output() switchViewEvent = new EventEmitter<string>();

    constructor() {}

    prevent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    hoverStart(e: MouseEvent) {
        this.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.add('mouse-hover');
    }

    hoverEnd(e: MouseEvent) {
        this.prevent(e);
        const target = e.target as HTMLElement;
        target.classList.remove('mouse-hover');
    }

    switchView() {
        this.switchViewEvent.emit("none");
    }
}
