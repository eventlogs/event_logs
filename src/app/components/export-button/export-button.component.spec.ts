import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { ExportButtonComponent } from './export-button.component';

describe('ExportButtonComponent', () => {
    let component: ExportButtonComponent;
    let fixture: ComponentFixture<ExportButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExportButtonComponent, MatIcon],
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
