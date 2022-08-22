import { Component } from '@angular/core';
import { EventlogDataService } from 'src/app/services/common/data/eventlog-data.service';
import { Trace } from '../../classes/EventLog/trace';

@Component({
    selector: 'app-log-information-view',
    templateUrl: './log-information-view.component.html',
    styleUrls: ['./log-information-view.component.scss'],
})
export class LogInformationViewComponent {
    public sortedTraces = this.sortTraces(
        this._eventlogDataService.eventLog.traces
    );
    constructor(public _eventlogDataService: EventlogDataService) {}

    sortTraces(traces: Array<Trace>): Array<Trace> {
        let sortedTraces = traces.sort((a, b) => {
            if (a.events.length != b.events.length) {
                return a.events.length - b.events.length;
            }

            for (const { index, aEvent } of a.events.map((aEvent, index) => ({
                index,
                aEvent,
            }))) {
                const bEvent = b.events[index];
                if (aEvent.activity === bEvent.activity) {
                    continue;
                }
                return aEvent.activity.localeCompare(bEvent.activity);
            }
            return 0;
        });
        return sortedTraces;
    }
}
