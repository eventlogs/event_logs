import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DrawingAreaComponent } from './components/drawingArea/drawingArea.component';
import { WertschoepfungsketteComponent } from './components/wertschoepfungskette/wertschoepfungskette.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { DragDropFileUploadDirective } from './directives/drag-drop-file/drag-drop-file-upload.directive';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { DirectlyFollowsGraphComponent } from './components/directly-follows-graph/directly-follows-graph.component';
import { SwitchViewButtonComponent } from './components/switch-view-button/switch-view-button.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { APP_BASE_HREF } from '@angular/common';
import { TracesDetailViewComponent } from './components/traces-detail-view/traces-detail-view.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { SwitchDirectionButtonComponent } from './components/switch-direction-button/switch-direction-button.component';

@NgModule({
    declarations: [
        AppComponent,
        WertschoepfungsketteComponent,
        DrawingAreaComponent,
        FooterComponent,
        UploadButtonComponent,
        DragDropFileUploadDirective,
        ExportButtonComponent,
        DirectlyFollowsGraphComponent,
        DeleteButtonComponent,
        SwitchViewButtonComponent,
        TracesDetailViewComponent,
        SwitchDirectionButtonComponent,
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
    ],
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
    bootstrap: [AppComponent],
})
export class AppModule {}
