import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIcon } from '@angular/material/icon';
import { ExportButtonComponent } from './export-button.component';
import {
    MatMenu,
    MatMenuContent,
    MatMenuModule,
    MatMenuTrigger,
} from '@angular/material/menu';
import { NgModule } from '@angular/core';
import { AppModule } from '../../app.module';
import { MatDialogModule } from '@angular/material/dialog';
import { OverlayModule } from '@angular/cdk/overlay';
import { ExportMenuItemComponent } from './export-menu-item/export-menu-item.component';
import { MatFormField } from '@angular/material/form-field';

describe('ExportButtonComponent', () => {
    let component: ExportButtonComponent;
    let fixture: ComponentFixture<ExportButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            imports: [MatDialogModule, MatMenuModule, OverlayModule],
            declarations: [
                ExportButtonComponent,
                MatIcon,
                MatMenu,
                MatMenuContent,
                MatMenuTrigger,
                ExportMenuItemComponent,
                MatFormField,
            ],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ExportButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
