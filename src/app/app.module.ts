import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { DisplayComponent } from './components/display/display.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { FooterComponent } from './components/footer/footer.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';
import { DragDropFileUploadDirective } from './directives/drag-drop-file/drag-drop-file-upload.directive';
import { SwitchViewDirective } from './directives/switch-view/switch-view.directive';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { DirectlyFollowsGraphComponent } from './components/directly-follows-graph/directly-follows-graph.component';
import { SwitchViewButtonComponent } from "./components/switch-view-button/switch-view-button.component";

@NgModule({
    declarations: [
        AppComponent,
        DisplayComponent,
        FooterComponent,
        UploadButtonComponent,
        DragDropFileUploadDirective,
        SwitchViewDirective,
        ExportButtonComponent,
        DirectlyFollowsGraphComponent,
        SwitchViewButtonComponent
    ],
    imports: [
        BrowserModule,
        FlexLayoutModule,
        BrowserAnimationsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatIconModule,
        ReactiveFormsModule,
    ],
    providers: [],
    bootstrap: [AppComponent],
})
export class AppModule {}
