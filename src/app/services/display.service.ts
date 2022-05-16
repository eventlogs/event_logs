import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Diagram, GraphEvent, GraphTrace } from '../classes/diagram/diagram';
import { EventLog } from '../classes/EventLog/eventlog';
import { Event } from '../classes/EventLog/event';
import { Element, ElementType } from '../classes/diagram/element';
import { Trace } from '../classes/EventLog/trace';

// class ObjectSet extends Set{
//     override add(elem: any){
//       return super.add(typeof elem === 'object' ? JSON.stringify(elem) : elem);
//     }
//     override has(elem: any){
//       return super.has(typeof elem === 'object' ? JSON.stringify(elem) : elem);
//     }
// }



@Injectable({
    providedIn: 'root'
})
export class DisplayService implements OnDestroy {

    private _diagram$: BehaviorSubject<Diagram>;

    constructor() {
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

    private getEventGraphics(trace: Trace) : GraphEvent[] {
        let graphEvents = new Array<GraphEvent>();
        trace.events.forEach( (ev) => {
            //TODO SVG ELEMENT BAUEN
            let el = new Element();
            el.x = 0;
            el.y = 0;
            let rect = new Element();
            rect.x = 0;
            rect.y = 0;
            rect.type = ElementType.rect;
            graphEvents.push(new GraphEvent(ev.activity, [el, rect])); 
        })
        return graphEvents;
    }

    private convertEventLogToDiagram(log: EventLog) : Diagram {
        let traces = log.sortedTraces
        let graphTraces = new Array<GraphTrace>();
        traces.forEach((traces) => {
            let caseIds = traces.map( (val) => {
                return val.caseId;
            });
            let gt = new GraphTrace( this.getEventGraphics(traces[0]), traces.length,caseIds ); // TODO Events in Grafiken Packen
            graphTraces.push(gt);
        });

        return new Diagram( graphTraces );
    }

    public displayEventLog(log: EventLog) {
        //TODO EventLog in Diagramtyp übersetzen und darstellen
        let net = this.convertEventLogToDiagram( log);
        this._diagram$.next(net);
    }

}
