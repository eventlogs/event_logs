import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectlyFollowsGraphComponent } from './directly-follows-graph.component';

describe('DirectlyFollowsGraphComponent', () => {
    let component: DirectlyFollowsGraphComponent;
    let fixture: ComponentFixture<DirectlyFollowsGraphComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [DirectlyFollowsGraphComponent],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DirectlyFollowsGraphComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
