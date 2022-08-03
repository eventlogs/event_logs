import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ChangeViewButtonComponent } from './change-view-button.component';
import { MatMenu, MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';

describe('SwitchViewButtonComponent', () => {
    let component: ChangeViewButtonComponent;
    let fixture: ComponentFixture<ChangeViewButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, MatMenuModule, OverlayModule],
            declarations: [ChangeViewButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ChangeViewButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
