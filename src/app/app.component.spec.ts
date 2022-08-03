import { TestBed } from '@angular/core/testing';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { WertschoepfungsketteComponent } from './components/wertschoepfungskette/wertschoepfungskette.component';
import { ExportMenuItemComponent } from './components/export-button/export-menu-item/export-menu-item.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { NgModule } from '@angular/core';
import { AppModule } from './app.module';
import { MatMenu } from '@angular/material/menu';
import { DrawingAreaComponent } from './components/drawingArea/drawingArea.component';
import { ChangeViewButtonComponent } from './components/change-view-button/change-view-button.component';
import { DirectlyFollowsGraphComponent } from './components/directly-follows-graph/directly-follows-graph.component';
import { LogInformationViewComponent } from './components/log-information-view/log-information-view.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
            declarations: [
                AppComponent,
                WertschoepfungsketteComponent,
                DrawingAreaComponent,
                ExportMenuItemComponent,
                FooterComponent,
                UploadButtonComponent,
                MatIcon,
                MatFormField,
                MatLabel,
                ExportButtonComponent,
                MatMenu,
                MatFormField,
                ChangeViewButtonComponent,
                DirectlyFollowsGraphComponent,
                LogInformationViewComponent,
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
