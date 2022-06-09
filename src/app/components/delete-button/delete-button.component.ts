import { Component, Input } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;

    constructor(
        private _displayService: DisplayService,
        private _eventlogDataService: EventlogDataService
    ) {}

    processMouseClick(e: MouseEvent) {
        let eventLog = this._eventlogDataService.eventLog;
        eventLog.deleteTraceByCaseIds(
            this._displayService.selectedTraceCaseIds
        );
        this._displayService.selectTraceCaseIds([]);
    }
}
