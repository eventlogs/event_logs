import { Injectable } from '@angular/core';
import { EventLog } from '../classes/EventLog/eventlog';
import { Event } from '../classes/EventLog/event';
import { Trace } from '../classes/EventLog/trace';
import {
    BooleanAttribute,
    DateAttribute,
    EventLogAttribute,
    FloatAttribute,
    IntAttribute,
    StringAttribute,
} from '../classes/EventLog/eventlogattribute';

@Injectable({
    providedIn: 'root',
})
export class ParserService {
    public static PARSING_ERROR = new Error(
        'given .type log string can not be parsed'
    );

    constructor() {}

    private readonly _typeLogElement = '.type log';
    private readonly _attributesElement = '.attributes';
    private readonly _eventsElement = '.events';

    private readonly _caseIdElement = 'case-id';
    private readonly _activityElement = 'activity';

    /**
     * Liest einen String im .type log Format ein, das von XXX und Jakub Kovar definiert wurde und wandelt es in die
     * intern verwendete Repräsentation als {@link EventLog} um
     *
     * @param text String im .type log Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    public parse(text: string): EventLog {
        const lines: string[] = text.split(/\r?\n/);

        const indexLog = ParserService.indexOfTokenIfExists(
            lines,
            this._typeLogElement
        );
        const indexAttributes = ParserService.indexOfTokenIfExists(
            lines,
            this._attributesElement
        );
        const indexEvents = ParserService.indexOfTokenIfExists(
            lines,
            this._eventsElement
        );
        const max = lines.length;
        const keywordIndices: number[] = [
            indexLog,
            indexAttributes,
            indexEvents,
            max,
        ];

        const attributesLines: string[] = lines.slice(
            indexAttributes + 1,
            ParserService.nextKeyword(keywordIndices, indexAttributes)
        );
        const headers: string[] = attributesLines.map(attribute =>
            attribute.trim()
        );

        const eventLines: string[] = lines.slice(
            indexEvents + 1,
            ParserService.nextKeyword(keywordIndices, indexEvents)
        );

        const traces: Trace[] = this.parseTraces(headers, eventLines);
        return new EventLog([], [], [], traces, []);
    }

    private parseTraces(headers: string[], eventLines: string[]): Trace[] {
        const asTable = eventLines.map(eventLine =>
            eventLine.split(' ').map(attributeValue => attributeValue.trim())
        );

        const dictCaseIdentifierToTrace: Map<Number, Trace> = new Map();
        asTable.forEach(eventLine => {
            if (
                eventLine[headers.indexOf(this._caseIdElement)] === undefined ||
                eventLine[headers.indexOf(this._activityElement)] === undefined
            ) {
                throw ParserService.PARSING_ERROR;
            }

            const caseId: number = parseInt(
                eventLine[headers.indexOf(this._caseIdElement)]
            );
            const activity: string =
                eventLine[headers.indexOf(this._activityElement)];

            const eventLogAttributes: EventLogAttribute[] = headers
                .filter(
                    header =>
                        ![this._caseIdElement, this._activityElement].includes(
                            header
                        )
                )
                .filter(header => headers.indexOf(header) < eventLine.length)
                .map(header =>
                    ParserService.eventLogAttributeOf(
                        header,
                        eventLine[headers.indexOf(header)]
                    )
                );

            if (!dictCaseIdentifierToTrace.has(caseId)) {
                dictCaseIdentifierToTrace.set(
                    caseId,
                    new Trace([], [], caseId)
                );
            }
            dictCaseIdentifierToTrace
                .get(caseId)
                ?.events.push(new Event(eventLogAttributes, activity));
        });

        return Array.from(dictCaseIdentifierToTrace.values());
    }

    private static indexOfTokenIfExists(
        lines: string[],
        token: string
    ): number {
        const indexOfToken = lines.indexOf(token);
        if (indexOfToken === -1) {
            throw ParserService.PARSING_ERROR;
        }
        return indexOfToken;
    }

    private static nextKeyword(
        keywordIndices: number[],
        actKeyWord: number
    ): number {
        const result = Math.min(
            ...keywordIndices.filter(value => value > actKeyWord)
        );
        if (isNaN(result)) {
            throw ParserService.PARSING_ERROR;
        }
        return result;
    }

    private static eventLogAttributeOf(
        key: string,
        value: string
    ): EventLogAttribute {
        switch (value) {
            case 'true':
                return new BooleanAttribute(true, key);
            case 'false':
                return new BooleanAttribute(false, key);
        }

        if (value.includes('T') || value.includes(':') || value.includes('-')) {
            const timestamp = Date.parse(value);
            if (!isNaN(timestamp)) {
                return new DateAttribute(new Date(timestamp), key);
            }
        }

        if (value.includes('.') || value.includes(',')) {
            const asFloat = parseFloat(value);
            if (!isNaN(asFloat)) {
                return new FloatAttribute(asFloat, key);
            }
        }

        const asInt = parseInt(value);
        if (!isNaN(asInt)) {
            return new IntAttribute(asInt, key);
        }

        return new StringAttribute(value, key);
    }
}
