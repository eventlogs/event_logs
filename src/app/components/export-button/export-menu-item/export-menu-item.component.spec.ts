import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { ExportMenuItemComponent } from './export-menu-item.component';

describe('ExportButtonComponent', () => {
    let component: ExportMenuItemComponent;
    let fixture: ComponentFixture<ExportMenuItemComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ExportMenuItemComponent, MatIcon],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportMenuItemComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
