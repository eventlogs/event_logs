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
import { DragDropFileUploadDirective } from './drag-drop-file-upload.directive';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';

@NgModule({
    declarations: [
        AppComponent,
        DisplayComponent,
        FooterComponent,
        UploadButtonComponent,
        DragDropFileUploadDirective,
        ExportButtonComponent,
        DeleteButtonComponent,
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
