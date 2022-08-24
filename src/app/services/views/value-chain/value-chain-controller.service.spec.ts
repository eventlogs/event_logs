import { TestBed } from '@angular/core/testing';
import { ValueChainControllerService } from './value-chain-controller.service';
import { AppModule } from '../../../app.module';
import { NgModule } from '@angular/core';

describe('ValueChainControllerService', () => {
    let service: ValueChainControllerService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        });
        service = TestBed.inject(ValueChainControllerService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
