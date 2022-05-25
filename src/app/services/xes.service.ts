import { Injectable } from '@angular/core';
import { Event } from '../classes/EventLog/event';
import { EventLog } from '../classes/EventLog/eventlog';
import {
    BooleanAttribute,
    DateAttribute,
    EventLogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../classes/EventLog/eventlogattribute';
import { Trace } from '../classes/EventLog/trace';
var format = require('xml-formatter');

@Injectable({
    providedIn: 'root',
})
export class XesService {
    /**
     * Wandelt die intern verwendete Repräsentation in ein XES formattierten String um
     *
     * @param eventLog interne Repräsentation als {@link EventLog}
     * @return XES formattierter String
     */
    public generate(eventLog: EventLog): string {
        let xesString = '<?xml version="1.0" encoding="UTF-8" ?>';
        xesString += '<log xes.version="2.0">';
        eventLog.traces.forEach(trace => {
            xesString += this.getTraceRepresentation(trace);
        });
        xesString += '</log>';
        return format(xesString);
    }

    private getTraceRepresentation(trace: Trace): string {
        let traceString = '<trace>';
        traceString += '<string key="case-id" value="' + trace.caseId + '" />';
        trace.events.forEach(event => {
            traceString += this.getEventRepresentation(event);
        });
        traceString += '</trace>';
        return traceString;
    }

    private getEventRepresentation(event: Event): string {
        let eventString = '<event>';
        eventString +=
            '<string key="activity" value="' + event.activity + '" />';
        event.attributes.forEach(attribute => {
            eventString += this.getAttributeRepresentation(attribute);
        });
        eventString += '</event>';
        return eventString;
    }

    private getAttributeRepresentation(attribute: EventLogAttribute): string {
        if (attribute instanceof StringAttribute) {
            return (
                '<string key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        if (attribute instanceof DateAttribute) {
            return (
                '<date key="' +
                attribute.key +
                '" value="' +
                attribute.value.toISOString() +
                '" />'
            );
        }
        if (attribute instanceof IntAttribute) {
            return (
                '<int key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        if (attribute instanceof FloatAttribute) {
            return (
                '<float key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        if (attribute instanceof BooleanAttribute) {
            return (
                '<boolean key="' +
                attribute.key +
                '" value="' +
                attribute.value +
                '" />'
            );
        }
        console.error('unknown attribute type');
        return '';
    }
}
