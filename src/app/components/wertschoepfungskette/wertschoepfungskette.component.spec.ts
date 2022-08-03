import { ComponentFixture, TestBed } from '@angular/core/testing';
import { WertschoepfungsketteComponent } from './wertschoepfungskette.component';
import { AppModule } from '../../app.module';
import { NgModule } from '@angular/core';

describe('WertschoepfungsketteComponent', () => {
    let component: WertschoepfungsketteComponent;
    let fixture: ComponentFixture<WertschoepfungsketteComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [WertschoepfungsketteComponent],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(WertschoepfungsketteComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
