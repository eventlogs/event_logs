import { Injectable } from '@angular/core';
import * as xml2js from 'xml2js';
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
import { Classifier } from '../classes/EventLog/classifier';

@Injectable({
    providedIn: 'root',
})
export class XesParserService {
    public static PARSING_ERROR = new Error(
        'given xes string can not be parsed'
    );

    constructor() {}

    private readonly _logToken = 'LOG';
    private readonly _attributesToken = '$';
    private readonly _extensionToken = 'EXTENSION';
    private readonly _classifierToken = 'CLASSIFIER';
    private readonly _globalToken = 'GLOBAL';
    private readonly _traceToken = 'TRACE';
    private readonly _eventToken = 'EVENT';
    private readonly _scopeToken = 'SCOPE';
    private readonly _stringAttributeToken = 'STRING';
    private readonly _dateAttributeToken = 'DATE';
    private readonly _intAttributeToken = 'INT';
    private readonly _floatAttributeToken = 'FLOAT';
    private readonly _booleanAttributeToken = 'BOOLEAN';
    private readonly _nameToken = 'NAME';
    private readonly _keysToken = 'KEYS';
    private readonly _keyToken = 'KEY';
    private readonly _valueToken = 'VALUE';
    private readonly _activityEventLogAttributeKey = 'activity';
    private readonly _eventScopeValue = 'event';
    private readonly _traceScopeValue = 'trace';

    private readonly _allXesElements = [
        this._stringAttributeToken,
        this._dateAttributeToken,
        this._intAttributeToken,
        this._floatAttributeToken,
        this._booleanAttributeToken,
    ];

    /**
     * Liest einen String im Xes-Format ein und wandelt es in dieintern verwendete Repräsentation als {@link EventLog} um
     *
     * @param xmlString String im Xes-Format, der geparst werden soll
     * @return interne Darstellung als {@link EventLog}
     */
    public parse(xmlString: string): EventLog {
        const parser = new xml2js.Parser({ strict: false, trim: true });
        let parsedXmlObj = undefined;
        parser.parseString(xmlString, (err: Error | null, result: any) => {
            if (err == null) {
                parsedXmlObj = result;
            } else {
                throw XesParserService.PARSING_ERROR;
            }
        });
        if (parsedXmlObj == null) {
            throw XesParserService.PARSING_ERROR;
        }
        try {
            return this.convertToEventLog(parsedXmlObj);
        } catch (e) {
            throw XesParserService.PARSING_ERROR;
        }
    }

    private convertToEventLog(result: any): EventLog {
        if (result == null || result[this._logToken] == null) {
            return new EventLog([], [], [], [], []);
        }
        const logObj = result[this._logToken];
        const logElements = this.readElementsOfAttribute(logObj); // TODO -> Nutzen?? > Sachen wie XES.VERSION, OPENXES.VERSION, XES.FEATURES, XMLNS, XMLNS:XSI,  XSI:SCHEMALOCATION etc.
        const extensions = this.convertToExtensions(
            logObj[this._extensionToken]
        ); // TODO -> Nutzen ?? Aktuell Array, dass jeweils eine Extension mit Keys (NAME, PREFIX, URI) enthält
        const classifiers = this.convertToClassifiers(
            logObj[this._classifierToken]
        );
        const globalAttributes = logObj[this._globalToken];
        const globalEventAttributes = this.convertToGlobalAttributes(
            this._eventScopeValue,
            globalAttributes
        );
        const globalTraceAttributes = this.convertToGlobalAttributes(
            this._traceScopeValue,
            globalAttributes
        );
        const traces = this.convertToTraces(logObj[this._traceToken]);
        const logAttributes = this.extractEventLogAttributes(logObj);

        return new EventLog(
            classifiers,
            globalEventAttributes,
            globalTraceAttributes,
            traces,
            logAttributes
        );
    }

    private readElementsOfAttribute(objWithAttributes: any): Map<string, any> {
        const attributeToValueMap: Map<string, any> = new Map();
        const attributesObj = objWithAttributes[this._attributesToken];
        if (attributesObj != null) {
            Object.entries(attributesObj)
                .filter(value => value.length == 2)
                .forEach(attribute =>
                    attributeToValueMap.set(attribute[0], attribute[1])
                );
        }
        return attributeToValueMap;
    }

    private convertToExtensions(extensionsObj: any): Map<string, string> {
        if (extensionsObj == null) {
            return new Map<string, string>();
        }
        return extensionsObj.map((extensionsObj: any) =>
            this.readElementsOfAttribute(extensionsObj)
        );
    }

    private convertToClassifiers(classifiersObj: any): Classifier[] {
        if (classifiersObj == null) {
            return [];
        }
        return classifiersObj
            .map((classifierObj: any) =>
                this.readElementsOfAttribute(classifierObj)
            )
            .map(
                (elementsMap: any) =>
                    new Classifier(
                        elementsMap.get(this._nameToken),
                        elementsMap.get(this._keysToken).split(' ')
                    )
            );
    }

    private convertToGlobalAttributes(
        scope: string,
        globalAttributes: any
    ): EventLogAttribute[] {
        if (globalAttributes == null) {
            return [];
        }
        const result = globalAttributes
            .filter(
                (scopedAttributes: any) =>
                    this.readElementsOfAttribute(scopedAttributes).get(
                        this._scopeToken
                    ) === scope
            )
            .map((scopedAttributes: any) =>
                this.extractEventLogAttributes(scopedAttributes)
            )[0];
        return result != null ? result : [];
    }

    private convertToTraces(tracesObj: any): Trace[] {
        if (tracesObj == null) {
            return [];
        }
        return tracesObj
            .map((traceObj: any, caseId: number) =>
                this.convertToTrace(traceObj, caseId)
            )
            .filter((trace: Trace | undefined) => trace != null);
    }

    convertToTrace(traceObj: any, caseId: number): Trace | undefined {
        if (traceObj == null) {
            return undefined;
        }
        const attributes = this.extractEventLogAttributes(traceObj);
        const events: Event[] = this.convertToEvents(
            traceObj[this._eventToken]
        );
        return new Trace(attributes, events, caseId);
    }

    private convertToEvents(eventsObj: any): Event[] {
        if (eventsObj == null) {
            return [];
        }
        return eventsObj
            .map((eventObj: any) => this.convertToEvent(eventObj))
            .filter((event: Event | undefined) => event != null);
    }

    private convertToEvent(eventObj: any): Event | undefined {
        if (eventObj == null) {
            return undefined;
        }
        const eventLogAttributes = this.extractEventLogAttributes(eventObj);
        const activityArr = eventLogAttributes
            .filter(
                eventLogAttribute =>
                    eventLogAttribute.key.toLowerCase() ==
                    this._activityEventLogAttributeKey
            )
            .map(eventLogAttribute => eventLogAttribute.value);
        const activity = activityArr.length === 1 ? activityArr[0] : undefined; // TODO -> Passt hier undefined??!! oder gar kein Event returnen??!!
        return new Event(eventLogAttributes, activity);
    }

    private extractEventLogAttributes(eventObj: any): EventLogAttribute[] {
        if (eventObj == null) {
            return [];
        }
        return Object.entries(eventObj)
            .filter(value => value.length == 2)
            .filter(value => this._allXesElements.includes(value[0]))
            .map(value =>
                this.extractEventLogAttributesOfType(value[0], value[1])
            )
            .flatMap(attributesPerType => attributesPerType);
    }

    private extractEventLogAttributesOfType(
        type: string,
        attributes: any
    ): EventLogAttribute[] {
        if (attributes == null) {
            return [];
        }
        const directAttributes = attributes
            .map(
                (attribute: { [x: string]: any }) =>
                    attribute[this._attributesToken]
            )
            .map((attribute: { [x: string]: any }) =>
                this.buildAttribute(
                    type,
                    attribute[this._valueToken],
                    attribute[this._keyToken]
                )
            )
            .filter(
                (attribute: EventLogAttribute | undefined) => attribute != null
            );
        const subAttributes = attributes
            .map((attribute: { [x: string]: any }) => attribute[type])
            .flatMap((subAttribute: any) =>
                this.extractEventLogAttributesOfType(type, subAttribute)
            );
        return directAttributes.concat(subAttributes);
    }

    private buildAttribute(
        type: string,
        value: any,
        key: String
    ): EventLogAttribute | undefined {
        switch (type) {
            case this._stringAttributeToken:
                return new StringAttribute(value, key);
            case this._dateAttributeToken:
                return new DateAttribute(new Date(value), key);
            case this._intAttributeToken:
                return new IntAttribute(Number(value), key);
            case this._floatAttributeToken:
                return new FloatAttribute(Number(value), key);
            case this._booleanAttributeToken:
                return new BooleanAttribute(Boolean(value), key);
            default:
                console.error(
                    'unknown attribute type ' +
                        type +
                        ' with value ' +
                        value +
                        ' will be ignored'
                );
                return undefined;
        }
    }
}
