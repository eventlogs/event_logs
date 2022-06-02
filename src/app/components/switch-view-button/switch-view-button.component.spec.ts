import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SwitchViewButtonComponent } from './switch-view-button.component';

describe('SwitchViewButtonComponent', () => {
    let component: SwitchViewButtonComponent;
    let fixture: ComponentFixture<SwitchViewButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SwitchViewButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchViewButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
