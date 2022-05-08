import {Injectable, OnDestroy} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Diagram} from '../classes/diagram/diagram';
import { EventLog } from '../classes/EventLog/eventlog';

@Injectable({
    providedIn: 'root'
})
export class DisplayService implements OnDestroy {

    private _diagram$: BehaviorSubject<Diagram>;

    constructor() {
        this._diagram$ = new BehaviorSubject<Diagram>(new Diagram());
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

    public displayEventLog(net: EventLog) {
        //TODO EventLog in Diagramtyp übersetzen und darstellen
        //this._diagram$.next(net);
    }

}
