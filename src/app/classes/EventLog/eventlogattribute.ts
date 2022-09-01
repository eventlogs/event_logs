import 'reflect-metadata';
import { jsonObject, jsonMember } from 'typedjson';

export abstract class EventLogAttribute {
    abstract value: any;
    abstract key: string;
}

@jsonObject
export class StringAttribute extends EventLogAttribute {
    @jsonMember
    override value: string;

    @jsonMember
    override key: string = '';

    constructor(value: string, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class DateAttribute extends EventLogAttribute {
    @jsonMember
    override  value: Date;

    @jsonMember
    override key: string = '';


    constructor(value: Date, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class IntAttribute extends EventLogAttribute {
    @jsonMember
    override value: number;

    @jsonMember
    override key: string = '';


    constructor(value: number, key: string) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }
}

@jsonObject
export class FloatAttribute extends EventLogAttribute {
    @jsonMember
    override value: number;

    @jsonMember
    override key: string = '';


    constructor(value: number, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

@jsonObject
export class BooleanAttribute extends EventLogAttribute {
    @jsonMember
    override value: boolean;

    @jsonMember
    override key: string = '';


    constructor(value: boolean, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}
