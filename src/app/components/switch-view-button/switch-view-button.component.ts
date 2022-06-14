import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-switch-view-button',
    templateUrl: './switch-view-button.component.html',
    styleUrls: ['./switch-view-button.component.scss'],
})
export class SwitchViewButtonComponent {
    @Output() switchViewEvent = new EventEmitter<string>();

    constructor() {}

    switchView() {
        this.switchViewEvent.emit("none");
    }
}
