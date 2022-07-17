import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
    selector: 'app-switch-view-button',
    templateUrl: './switch-view-button.component.html',
    styleUrls: ['./switch-view-button.component.scss'],
})
export class SwitchViewButtonComponent implements OnInit {
    @Input() initialText: string = 'Toggle View';
    @Input() switchedText: string = 'Toggle View';
    @Output() switchViewEvent = new EventEmitter<string>();

    buttonText: string | undefined;

    ngOnInit(): void {
        this.buttonText = this.initialText;
    }

    switchView() {
        if (this.buttonText === this.initialText) {
            this.buttonText = this.switchedText;
        } else {
            this.buttonText = this.initialText;
        }
        this.switchViewEvent.emit('none');
    }
}
