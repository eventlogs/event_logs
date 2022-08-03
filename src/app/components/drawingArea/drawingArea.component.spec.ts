import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DrawingAreaComponent } from './drawingArea.component';
import { WertschoepfungsketteComponent } from '../wertschoepfungskette/wertschoepfungskette.component';
import { ChangeViewButtonComponent } from '../change-view-button/change-view-button.component';
import { DirectlyFollowsGraphComponent } from '../directly-follows-graph/directly-follows-graph.component';
import {
    MatMenu,
    MatMenuContent,
    MatMenuModule,
    MatMenuTrigger,
} from '@angular/material/menu';
import { AppModule } from '../../app.module';
import { NgModule } from '@angular/core';
import { LogInformationViewComponent } from '../log-information-view/log-information-view.component';
import { Overlay, OverlayModule } from '@angular/cdk/overlay';
import { MatDialogModule } from '@angular/material/dialog';

describe('DrawingAreaComponent', () => {
    let component: DrawingAreaComponent;
    let fixture: ComponentFixture<DrawingAreaComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, MatMenuModule, OverlayModule],
            declarations: [
                DrawingAreaComponent,
                ChangeViewButtonComponent,
                WertschoepfungsketteComponent,
                DirectlyFollowsGraphComponent,
                MatMenu,
                LogInformationViewComponent,
                MatMenu,
                MatMenuContent,
                MatMenuTrigger,
            ],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
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
