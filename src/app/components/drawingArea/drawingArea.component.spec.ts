import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingAreaComponent } from './drawingArea.component';
import { WertschoepfungsketteComponent } from '../wertschoepfungskette/wertschoepfungskette.component';
import { ChangeViewButtonComponent } from '../change-view-button/change-view-button.component';
import { DirectlyFollowsGraphComponent } from '../directly-follows-graph/directly-follows-graph.component';

describe('DrawingAreaComponent', () => {
    let component: DrawingAreaComponent;
    let fixture: ComponentFixture<DrawingAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [
                DrawingAreaComponent,
                ChangeViewButtonComponent,
                WertschoepfungsketteComponent,
                DirectlyFollowsGraphComponent,
            ],
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(DrawingAreaComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
