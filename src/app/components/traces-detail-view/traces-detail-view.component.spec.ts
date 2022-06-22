import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TracesDetailViewComponent } from './traces-detail-view.component';

describe('TracesDetailViewComponent', () => {
    let component: TracesDetailViewComponent;
    let fixture: ComponentFixture<TracesDetailViewComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [TracesDetailViewComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TracesDetailViewComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
