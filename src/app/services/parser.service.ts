import {Injectable} from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';
import { Event } from '../classes/EventLog/event';
import { Trace } from '../classes/EventLog/trace';

@Injectable({
    providedIn: 'root'
})
export class ParserService {

    constructor() {
    }

    parse(text: string): EventLog | undefined {
        //DummyDaten bis der Parser funktioniert
        const trace1 = new Trace([],
        [new Event([], "Flug suchen"),
         new Event([], "Flug buchen")],
         1 );

        const trace2 = new Trace([],
        [new Event([], "Flug suchen"),
         new Event([], "Flug buchen"),
         new Event([], "Hotel suchen"),
         new Event([], "Hotel buchen")],
         1 );

        return new  EventLog([],[],[],[trace1, trace2], []);
    }
}
