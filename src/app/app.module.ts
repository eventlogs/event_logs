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
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatSidenavModule } from '@angular/material/sidenav';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { DragDropFileUploadDirective } from './directives/drag-drop-file/drag-drop-file-upload.directive';
import { ExportMenuItemComponent } from './components/export-button/export-menu-item/export-menu-item.component';
import { DirectlyFollowsGraphComponent } from './components/directly-follows-graph/directly-follows-graph.component';
import { ChangeViewButtonComponent } from './components/change-view-button/change-view-button.component';
import { APP_BASE_HREF } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatMenuModule } from '@angular/material/menu';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { SwitchDirectionButtonComponent } from './components/switch-direction-button/switch-direction-button.component';
import { FilterAreaComponent } from './components/filter-area/filter-area.component';
import { LogTraceCaseComponent } from './components/log-information-view/log-case/log-trace-case.component';
import { LogInformationViewComponent } from './components/log-information-view/log-information-view.component';
import { LayoutService } from './services/common/layout-service/layout.service';
import { SvgService } from './services/common/svg-service/svg.service';
import { AttributeValuePipe } from './pipes/attribute-value.pipe';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@NgModule({
    declarations: [
        AppComponent,
        WertschoepfungsketteComponent,
        DrawingAreaComponent,
        FooterComponent,
        UploadButtonComponent,
        DragDropFileUploadDirective,
        ExportMenuItemComponent,
        DirectlyFollowsGraphComponent,
        ChangeViewButtonComponent,
        DrawingAreaComponent,
        ExportButtonComponent,
        SwitchDirectionButtonComponent,
        FilterAreaComponent,
        LogInformationViewComponent,
        LogTraceCaseComponent,
        AttributeValuePipe,
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        FormsModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatButtonToggleModule,
        MatIconModule,
        MatSidenavModule,
        ReactiveFormsModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,
        MatMenuModule,
        MatProgressSpinnerModule,
        MatCheckboxModule,
    ],
    providers: [
        { provide: APP_BASE_HREF, useValue: '/' },
        {
            provide: LayoutService.VALUE_CHAIN_INSTANCE,
            useFactory: () =>
                new LayoutService(
                    LayoutService.X_OFFSET_VALUE_CHAIN,
                    LayoutService.Y_OFFSET_VALUE_CHAIN,
                    LayoutService.X_STEP_VALUE_CHAIN,
                    LayoutService.Y_STEP_VALUE_CHAIN,
                    LayoutService.X_LABELSIZE_VALUE_CHAIN
                ),
        },
        {
            provide: LayoutService.LOG_INFORMATION_INSTANCE,
            useFactory: () =>
                new LayoutService(
                    LayoutService.X_OFFSET_LOG_INFORMATION,
                    LayoutService.Y_OFFSET_LOG_INFORMATION,
                    LayoutService.X_STEP_LOG_INFORMATION,
                    LayoutService.Y_STEP_LOG_INFORMATION,
                    LayoutService.X_LABELSIZE_LOG_INFORMATION
                ),
        },
        {
            provide: SvgService.VALUE_CHAIN_INSTANCE,
            useFactory: (layoutService: LayoutService) =>
                new SvgService(
                    layoutService,
                    SvgService.MAXFONTWIDTH_VALUE_CHAIN,
                    SvgService.BOX_WIDTH_VALUE_CHAIN,
                    SvgService.BOX_HEIGHT_VALUE_CHAIN,
                    trace =>
                        trace.count.toString() +
                        (trace.count == 1 ? ' trace' : ' traces')
                ),
            deps: [LayoutService.VALUE_CHAIN_INSTANCE],
        },
        {
            provide: SvgService.LOG_INFORMATION_INSTANCE,
            useFactory: (layoutService: LayoutService) =>
                new SvgService(
                    layoutService,
                    SvgService.MAXFONTWIDTH_LOG_INFOMRATION,
                    SvgService.BOX_WIDTH_LOG_INFORMATION,
                    SvgService.BOX_HEIGHT_LOG_INFORMATION,
                    trace => 'case ' + trace.caseIds[0]
                ),
            deps: [LayoutService.LOG_INFORMATION_INSTANCE],
        },
    ],
    bootstrap: [AppComponent],
})
export class AppModule {}
