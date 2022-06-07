import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ExportButtonComponent } from './export-button.component';

describe('ExportButtonComponent', () => {
    let component: ExportButtonComponent;
    let fixture: ComponentFixture<ExportButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExportButtonComponent],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
