import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SwitchDirectionButtonComponent } from './switch-direction-button.component';

describe('SwitchDirectionButtonComponent', () => {
    let component: SwitchDirectionButtonComponent;
    let fixture: ComponentFixture<SwitchDirectionButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [SwitchDirectionButtonComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(SwitchDirectionButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
