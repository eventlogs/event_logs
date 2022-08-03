import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class TraceCaseSelectionService {
    private _selectedTraceCaseIds$: BehaviorSubject<Array<number>>;

    constructor() {
        this._selectedTraceCaseIds$ = new BehaviorSubject(new Array<number>());
    }

    public get selectedTraceCaseIds$(): Observable<Array<number>> {
        return this._selectedTraceCaseIds$.asObservable();
    }

    public get selectedTraceCaseIds(): Array<number> {
        return this._selectedTraceCaseIds$.getValue();
    }

    public selectTraceCaseIds(value: Array<number>) {
        let new_value;
        if (value.length == 0) {
            new_value = value;
        } else {
            if (value.every(val => this.selectedTraceCaseIds.includes(val))) {
                new_value = this.selectedTraceCaseIds.filter(
                    x => !value.includes(x)
                );
            } else {
                new_value = [...this.selectedTraceCaseIds, ...value];
            }
        }
        this._selectedTraceCaseIds$.next(new_value);
    }
}
