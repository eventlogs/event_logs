import { Pipe, PipeTransform } from '@angular/core';
import {
    DateAttribute,
    EventLogAttribute,
} from '../classes/EventLog/eventlogattribute';

@Pipe({
    name: 'attributeValue',
})
export class AttributeValuePipe implements PipeTransform {
    transform(attribute: EventLogAttribute): string {
        if (attribute instanceof DateAttribute) {
            return attribute.value.toLocaleDateString('de-De', {
                timeZone: 'UTC',
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
            });
        }
        return attribute.value;
    }
}
