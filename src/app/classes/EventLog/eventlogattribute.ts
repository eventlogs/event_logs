export abstract class EventLogAttribute {
    key: string = '';
    abstract value: any;
}

export class StringAttribute extends EventLogAttribute {

    value: string;

    constructor(value: string, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

export class DateAttribute extends EventLogAttribute {

    value: Date;

    constructor(value: Date, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

export class IntAttribute extends EventLogAttribute {

    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }
}

export class FloatAttribute extends EventLogAttribute {

    value: number;

    constructor(value: number, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

export class BooleanAttribute extends EventLogAttribute {

    value: Boolean;

    constructor(value: boolean, key: string) {
        super();
        this.value = value;
        this.key = key;
    }
}

