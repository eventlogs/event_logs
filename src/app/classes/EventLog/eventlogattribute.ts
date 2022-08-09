import 'reflect-metadata';
import { jsonObject, jsonMember } from "typedjson";

export abstract class EventLogAttribute {
    @jsonMember
    key: string = '';
    abstract value: any;
}

@jsonObject
export class StringAttribute extends EventLogAttribute {
    @jsonMember
    value: string;

    constructor(value: string, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class DateAttribute extends EventLogAttribute {
    @jsonMember
    value: Date;

    constructor(value: Date, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class IntAttribute extends EventLogAttribute {
    @jsonMember
    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }
}

@jsonObject
export class FloatAttribute extends EventLogAttribute {
    @jsonMember
    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class BooleanAttribute extends EventLogAttribute {
    @jsonMember
    value: boolean;

    constructor(value: boolean, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}
