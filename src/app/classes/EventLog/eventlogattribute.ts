export abstract class EventLogAttribute {
    key: String = '';
}

export class StringAttribute extends EventLogAttribute {
    value: String;

    constructor(value: String, key: String) {
        super();
        this.value = value;
        this.key = key;
    }
}

export class DateAttribute extends EventLogAttribute {
    value: Date;

    constructor(value: Date, key: String) {
        super();
        this.value = value;
        this.key = key;
    }
}

export class IntAttribute extends EventLogAttribute {
    value: number;

    constructor(value: number, key: String) {
        super();
        this.value = Math.round(value);
        this.key = key;
    }
}

export class FloatAttribute extends EventLogAttribute {
    value: number;

    constructor(value: number, key: String) {
        super();
        this.value = value;
        this.key = key;
    }
}

export class BooleanAttribute extends EventLogAttribute {
    value: Boolean;

    constructor(value: boolean, key: String) {
        super();
        this.value = value;
        this.key = key;
    }
}
