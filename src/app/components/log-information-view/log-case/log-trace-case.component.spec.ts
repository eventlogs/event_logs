import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogTraceCaseComponent } from './log-trace-case.component';
import { AppModule } from '../../../app.module';
import { NgModule } from '@angular/core';

describe('LogCaseComponent', () => {
    let component: LogTraceCaseComponent;
    let fixture: ComponentFixture<LogTraceCaseComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [LogTraceCaseComponent],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(LogTraceCaseComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
