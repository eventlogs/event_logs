import { TestBed } from '@angular/core/testing';
import { SvgService } from './svg.service';
import { AppModule } from '../../../app.module';
import { NgModule, ProviderToken } from '@angular/core';

describe('SvgService', () => {
    let service: SvgService;

    beforeEach(() => {
        TestBed.configureTestingModule({
            providers: (
                Reflect.getOwnPropertyDescriptor(AppModule, '__annotations__')
                    ?.value[0] as NgModule
            ).providers,
        });
        service = TestBed.inject<any>(
            SvgService.VALUE_CHAIN_INSTANCE as unknown as ProviderToken<any>
        );
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
