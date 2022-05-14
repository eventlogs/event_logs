import { Injectable } from '@angular/core';
import { Event } from '../classes/EventLog/event';
import { EventLog } from '../classes/EventLog/eventlog';
import { Trace } from '../classes/EventLog/trace';
import { ParserService } from './parser.service';

@Injectable({
  providedIn: 'root'
})
export class EventlogDataService {

  private _EventLog: EventLog = new EventLog([], [], [], [], []); // 

  public get EventLog(): EventLog {
    return this._EventLog;
  }
  public set EventLog(value: EventLog) {
    this._EventLog = value;
  }

  constructor() {
    let events1 = [ new Event([], "Flug suchen" ),
    new Event([], "Flug buchen" ),
    new Event([], "Hotel suchen" ),
    new Event([], "Hotel buchen" )];

    let events2 = [new Event([], "Hotel suchen" ),
    new Event([], "Hotel buchen" )];

    this._EventLog.traces.concat(new Trace([], events1, 1 )).concat(new Trace([], events2, 2));
   }
}
