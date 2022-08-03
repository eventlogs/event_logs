import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Diagram } from '../../../../classes/diagram/diagram';
import { GraphEvent } from '../../../../classes/diagram/GraphEvent';
import { Element, ElementType } from '../../../../classes/diagram/element';
import { Trace } from '../../../../classes/EventLog/trace';
import { TraceCaseSelectionService } from '../trace-case-selection-service/trace-case-selection.service';

@Injectable()
export abstract class DisplayServiceBase implements OnDestroy {
    protected _diagram$: BehaviorSubject<Diagram>;

    constructor(
        protected traceCaseSelectionService: TraceCaseSelectionService
    ) {
        this._diagram$ = new BehaviorSubject<Diagram>(new Diagram([]));
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

    protected getEventGraphics(
        trace: Trace,
        caseIds: Array<number>
    ): GraphEvent[] {
        let graphEvents = new Array<GraphEvent>();
        trace.events.forEach(ev => {
            // Text und Rechteck für Events erstellen, Koordinaten kommen vom Layoutservice
            let el = new Element(ElementType.text, () =>
                this.traceCaseSelectionService.selectTraceCaseIds(caseIds)
            );
            let box = new Element(ElementType.box, () =>
                this.traceCaseSelectionService.selectTraceCaseIds(caseIds)
            );
            graphEvents.push(new GraphEvent(ev.activity, [box, el]));
        });
        return graphEvents;
    }
}
