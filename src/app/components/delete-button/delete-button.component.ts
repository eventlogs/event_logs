import { Component, EventEmitter, Input, Output } from '@angular/core';
import { DisplayService } from 'src/app/services/display.service';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { LogService } from 'src/app/services/log.service';

@Component({
    selector: 'app-delete-button',
    templateUrl: './delete-button.component.html',
    styleUrls: ['./delete-button.component.scss'],
})
export class DeleteButtonComponent {
    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    @Output() updateTextarea = new EventEmitter();

    constructor(
        private _displayService: DisplayService,
        private _eventlogDataService: EventlogDataService,
        private _logService: LogService
    ) {}

    processMouseClick(e: MouseEvent) {
        let eventLog = this._eventlogDataService.eventLog;
        eventLog.deleteTraceByCaseIds(
            this._displayService.selectedTraceCaseIds
        );
        this._displayService.selectTraceCaseIds([]);
        let logString = this._logService.generate(eventLog);
        this.updateTextarea.emit(logString);
    }
}
