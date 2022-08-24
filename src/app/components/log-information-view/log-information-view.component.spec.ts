import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { LogInformationViewComponent } from './log-information-view.component';
import { MatFormField } from '@angular/material/form-field';
import { DrawingAreaComponent } from '../drawingArea/drawingArea.component';
import { OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { Trace } from '../../classes/EventLog/trace';
import { Event } from '../../classes/EventLog/event';
import { AppModule } from '../../app.module';
import { NgModule } from '@angular/core';

describe('TracesDetailViewComponent', () => {
    let component: LogInformationViewComponent;
    let fixture: ComponentFixture<LogInformationViewComponent>;

    beforeEach(waitForAsync(() => {
        TestBed.configureTestingModule({
            imports: [MatDialogModule, MatMenuModule, OverlayModule],
            declarations: [
                LogInformationViewComponent,
                DrawingAreaComponent,
                MatFormField,
            ],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(LogInformationViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
        });

        it('should compile', () => {
            expect(component).toBeTruthy();
        });

        it('should sort trace-cases correctly', () => {
            const example = [
                new Trace([], [new Event([], 'A'), new Event([], 'B')], 0),
                new Trace([], [new Event([], 'A'), new Event([], 'C')], 1),
                new Trace([], [new Event([], 'A')], 2),
                new Trace([], [new Event([], 'A'), new Event([], 'A')], 3),
            ];

            expect(
                component.sortTraces(example).map(value => value.caseId)
            ).toEqual([2, 3, 0, 1]);
        });
});
