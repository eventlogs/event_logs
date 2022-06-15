import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WertschoepfungsketteComponent } from './wertschoepfungskette.component';

describe('WertschoepfungsketteComponent', () => {
    let component: WertschoepfungsketteComponent;
    let fixture: ComponentFixture<WertschoepfungsketteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WertschoepfungsketteComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WertschoepfungsketteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
