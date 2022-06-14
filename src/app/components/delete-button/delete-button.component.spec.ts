import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EventLog } from 'src/app/classes/EventLog/eventlog';
import {
    BooleanAttribute,
    IntAttribute,
    StringAttribute,
} from 'src/app/classes/EventLog/eventlogattribute';
import { Event } from 'src/app/classes/EventLog/event';
import { Trace } from 'src/app/classes/EventLog/trace';
import { EventlogDataService } from 'src/app/services/eventlog-data.service';
import { DeleteButtonComponent } from './delete-button.component';
import { DisplayService } from 'src/app/services/display.service';
import { MatIcon } from '@angular/material/icon';

describe('DeleteButtonComponent', () => {
    let component: DeleteButtonComponent;
    let fixture: ComponentFixture<DeleteButtonComponent>;
    let eventlogDataService: EventlogDataService;
    let displayService: DisplayService;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DeleteButtonComponent, MatIcon],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DeleteButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        eventlogDataService = TestBed.inject(EventlogDataService);
        displayService = TestBed.inject(DisplayService);
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should delete selected traces', () => {
        eventlogDataService.eventLog = new EventLog(
            [],
            [],
            [],
            [
                new Trace(
                    [],
                    [
                        new Event(
                            [new StringAttribute('asd', 'stringValue')],
                            'Auto'
                        ),
                    ],
                    1
                ),
                new Trace(
                    [],
                    [
                        new Event(
                            [new BooleanAttribute(true, 'booleanValue')],
                            'Auto'
                        ),
                    ],
                    2
                ),
                new Trace(
                    [],
                    [new Event([new IntAttribute(1, 'intValue')], 'Auto')],
                    3
                ),
            ],
            []
        );
        displayService.selectTraceCaseIds([2, 3]);
        component.processMouseClick(new MouseEvent('click'));
        let expectedEventLog = new EventLog(
            [],
            [],
            [],
            [
                new Trace(
                    [],
                    [
                        new Event(
                            [new StringAttribute('asd', 'stringValue')],
                            'Auto'
                        ),
                    ],
                    1
                ),
            ],
            []
        );
        expect(eventlogDataService.eventLog).toEqual(expectedEventLog);
        expect(displayService.selectedTraceCaseIds).toEqual([]);
    });
});
