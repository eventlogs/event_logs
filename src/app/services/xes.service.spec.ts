import { TestBed } from '@angular/core/testing';
import { XesService } from './xes.service';
import { expect } from "@angular/flex-layout/_private-utils/testing";


describe('XesService', () => {
    let service: XesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(XesService);
    });

    it('should be created', () => {
        expect(service).toBeTruthy();
    });

});
