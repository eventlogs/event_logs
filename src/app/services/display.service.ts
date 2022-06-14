import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Diagram } from '../classes/diagram/diagram';
import { GraphTrace } from '../classes/diagram/GraphTrace';
import { GraphEvent } from '../classes/diagram/GraphEvent';
import { EventLog } from '../classes/EventLog/eventlog';
import { Event } from '../classes/EventLog/event';
import { Element, ElementType } from '../classes/diagram/element';
import { Trace } from '../classes/EventLog/trace';

@Injectable({
    providedIn: 'root',
})
export class DisplayService implements OnDestroy {
    private _diagram$: BehaviorSubject<Diagram>;
    private _selectedTraceCaseIds$: BehaviorSubject<Array<number>>;

    constructor() {
        this._diagram$ = new BehaviorSubject<Diagram>(new Diagram([]));
        this._selectedTraceCaseIds$ = new BehaviorSubject(new Array());
    }

    ngOnDestroy(): void {
        this._diagram$.complete();
    }

    public get diagram$(): Observable<Diagram> {
        return this._diagram$.asObservable();
    }

    public get diagram(): Diagram {
        return this._diagram$.getValue();
    }

    public display(net: Diagram) {
        this._diagram$.next(net);
    }

    public get selectedTraceCaseIds$(): Observable<Array<number>> {
        return this._selectedTraceCaseIds$.asObservable();
    }

    public get selectedTraceCaseIds(): Array<number> {
        return this._selectedTraceCaseIds$.getValue();
    }

    public selectTraceCaseIds(value: Array<number>) {
        this._selectedTraceCaseIds$.next(value);
    }

    private getEventGraphics(
        trace: Trace,
        caseIds: Array<number>
    ): GraphEvent[] {
        let graphEvents = new Array<GraphEvent>();
        trace.events.forEach(ev => {
            // Text und Rechteck für Events erstellen, Koordinaten kommen vom Layoutservice
            let el = new Element(ElementType.text, () =>
                this.selectTraceCaseIds(caseIds)
            );
            let box = new Element(ElementType.box, () =>
                this.selectTraceCaseIds(caseIds)
            );
            graphEvents.push(new GraphEvent(ev.activity, [box, el]));
        });
        return graphEvents;
    }

    private convertEventLogToDiagram(log: EventLog): Diagram {
        let traces = log.sortedTraces;
        let graphTraces = new Array<GraphTrace>();
        traces.forEach(traces => {
            let caseIds = traces.map(val => {
                return val.caseId;
            });
            let traceCount = new Element(ElementType.text, () =>
                this.selectTraceCaseIds(caseIds)
            );
            let gt = new GraphTrace(
                this.getEventGraphics(traces[0], caseIds),
                traces.length,
                [traceCount],
                caseIds
            );
            graphTraces.push(gt);
        });

        return new Diagram(graphTraces);
    }

    public displayEventLog(log: EventLog) {
        let net = this.convertEventLogToDiagram(log);
        this._diagram$.next(net);
    }
}
