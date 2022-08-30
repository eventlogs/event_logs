import { Component, OnDestroy, OnInit } from '@angular/core';
import { EventlogDataService } from 'src/app/services/common/data/eventlog-data.service';
import { Trace } from '../../classes/EventLog/trace';
import { Subscription } from 'rxjs';
import { ValueChainControllerService } from '../../services/views/value-chain/value-chain-controller.service';

@Component({
    selector: 'app-log-information-view',
    templateUrl: './log-information-view.component.html',
    styleUrls: ['./log-information-view.component.scss'],
})
export class LogInformationViewComponent implements OnInit, OnDestroy {
    private _sub: Subscription | undefined;
    public sortedTraces = this.sortTraces(
        this._eventlogDataService.eventLog.traces
    );
    constructor(
        public _eventlogDataService: EventlogDataService,
        private _valueChainControllerService: ValueChainControllerService
    ) {}

    ngOnInit(): void {
        this._sub = this._valueChainControllerService._elements$.subscribe(
            () => {
                this.sortedTraces = this.sortTraces(
                    this._eventlogDataService.eventLog.traces
                );
            }
        );
    }

    ngOnDestroy(): void {
        this._sub?.unsubscribe();
    }

    sortTraces(traces: Array<Trace>): Array<Trace> {
        return traces.sort((a, b) => {
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
    }

    getMaxCaseIdLetters(): number {
        return Math.max(
            ...this._eventlogDataService.eventLog.traces
                .map(trace => trace.caseId)
                .map(caseId => caseId.toString().length)
        );
    }
}
