import { Component, EventEmitter, Output } from '@angular/core';

@Component({
    selector: 'app-switch-direction-button',
    templateUrl: './switch-direction-button.component.html',
    styleUrls: ['./switch-direction-button.component.scss'],
})
export class SwitchDirectionButtonComponent {
    @Output() switchDirectionEvent: EventEmitter<boolean> = new EventEmitter();

    verticalDirection: boolean = true;

    constructor() {}

    switchDirection() {
        this.verticalDirection = !this.verticalDirection;
        this.switchDirectionEvent.emit(this.verticalDirection);
    }
}
