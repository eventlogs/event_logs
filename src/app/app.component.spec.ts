import { TestBed } from '@angular/core/testing';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { DeleteButtonComponent } from './components/delete-button/delete-button.component';
import { DisplayComponent } from './components/display/display.component';
import { ExportButtonComponent } from './components/export-button/export-button.component';
import { FooterComponent } from './components/footer/footer.component';
import { UploadButtonComponent } from './components/upload-button/upload-button.component';

describe('AppComponent', () => {
    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [RouterTestingModule],
            declarations: [
                AppComponent,
                DeleteButtonComponent,
                DisplayComponent,
                ExportButtonComponent,
                FooterComponent,
                UploadButtonComponent,
                MatIcon,
                MatFormField,
                MatLabel,
            ],
        }).compileComponents();
    });

    it('should create the app', () => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.componentInstance;
        expect(app).toBeTruthy();
    });
});
