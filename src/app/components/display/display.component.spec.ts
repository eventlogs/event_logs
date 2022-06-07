import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DisplayComponent } from './display.component';

describe('DisplayComponent', () => {
    let component: DisplayComponent;
    let fixture: ComponentFixture<DisplayComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DisplayComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DisplayComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
