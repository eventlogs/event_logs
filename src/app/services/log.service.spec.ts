import { TestBed } from '@angular/core/testing';
import { LogService } from './log.service';
import { EventLog } from '../classes/EventLog/eventlog';
import { Trace } from '../classes/EventLog/trace';
import { Event } from '../classes/EventLog/event';
import { StringAttribute } from '../classes/EventLog/eventlogattribute';

describe('Log.ServiceService', () => {
    let service: LogService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(LogService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

    it('should format internal representation as formatted xes string', () => {
        const sampleExportLog = new EventLog(
            [],
            [],
            [],
            [
                new Trace(
                    [new StringAttribute('1-147898401', 'concept:name')],
                    [
                        new Event(
                            [
                                new StringAttribute('Group 1', 'org:group'),
                                new StringAttribute('Role 1', 'org:role'),
                                new StringAttribute("Name ' 1", 'org:name'),
                                new StringAttribute(
                                    '',
                                    'ignoredAttributeEmptyValue'
                                ),
                                new StringAttribute(
                                    'ignoredAttributeEmptyKey',
                                    ''
                                ),
                            ],
                            'Baden'
                        ),
                        new Event(
                            [new StringAttribute('Group 2', 'org:group')],
                            'Schwimmen'
                        ),
                    ],
                    0
                ),
                new Trace(
                    [],
                    [
                        new Event(
                            [
                                new StringAttribute('Name 3', 'org:name'),
                                new StringAttribute('Group 3', 'org:group'),
                            ],
                            'Lesen'
                        ),
                        new Event(
                            [new StringAttribute('Other Value 4', 'org:other')],
                            'Lesen'
                        ),
                    ],
                    1
                ),
            ],
            []
        );

        const expectedResult =
            '.type log\n' +
            '.attributes\n' +
            'case-id\n' +
            'activity\n' +
            'org:group\n' +
            'org:name\n' +
            'org:role\n' +
            'org:other\n' +
            '.events\n' +
            "0 Baden 'Group 1' 'Name \\' 1' 'Role 1'\n" +
            "0 Schwimmen 'Group 2'\n" +
            "1 Lesen 'Group 3' 'Name 3'\n" +
            "1 Lesen '' '' '' 'Other Value 4'";

        expect(service.generate(sampleExportLog)).toEqual(expectedResult);
    });
});
