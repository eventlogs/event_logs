import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ValueChainComponent } from './value-chain.component';
import { AppModule } from '../../app.module';
import { NgModule } from '@angular/core';

describe('ValueChainComponent', () => {
    let component: ValueChainComponent;
    let fixture: ComponentFixture<ValueChainComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [ValueChainComponent],
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        }).compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(ValueChainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
