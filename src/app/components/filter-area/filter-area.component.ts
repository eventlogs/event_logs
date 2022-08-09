import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatCheckboxChange } from '@angular/material/checkbox';

export class FilterArgument {
    constructor(
        public filterValue: string,
        public filterActivity: boolean,
        public filterAttributeValues: boolean,
        public matchCase: boolean
    ) {}
}

@Component({
    selector: 'app-filter-area',
    templateUrl: './filter-area.component.html',
    styleUrls: ['./filter-area.component.scss'],
})
export class FilterAreaComponent {
    constructor() {}

    @Output() filterChanged = new EventEmitter();

    _filterActivity: boolean = true;
    _filterAttributeValues: boolean = false;
    _filterUsed: boolean = false;
    _matchCase: boolean = false;
    _filterValue: string = '';

    toggleMatchCase($event: MatButtonToggleChange) {
        this._matchCase = $event.source.checked;
        if (this._filterUsed) {
            this.filterChanged.emit(
                new FilterArgument(
                    this._filterValue,
                    this._filterActivity,
                    this._filterAttributeValues,
                    this._matchCase
                )
            );
        }
    }

    toggleFilter($event: MatButtonToggleChange) {
        this._filterUsed = $event.source.checked;
        if (this._filterUsed) {
            this.filterChanged.emit(
                new FilterArgument(
                    this._filterValue,
                    this._filterActivity,
                    this._filterAttributeValues,
                    this._matchCase
                )
            );
        } else {
            this.filterChanged.emit(
                new FilterArgument('', false, false, false)
            );
        }
    }

    toggleActivity($event: MatCheckboxChange) {
        if (!this._filterAttributeValues && !this._filterActivity) {
            this._filterAttributeValues = true; // Eine Checkbox muss immer aktiv sein
        }
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(
            new FilterArgument(
                this._filterValue,
                this._filterActivity,
                this._filterAttributeValues,
                this._matchCase
            )
        );
    }

    toggleValues($event: MatCheckboxChange) {
        if (!this._filterAttributeValues && !this._filterActivity) {
            this._filterActivity = true; // Eine Checkbox muss immer aktiv sein
        }
        if (!this._filterUsed) {
            return;
        }
        this.filterChanged.emit(
            new FilterArgument(
                this._filterValue,
                this._filterActivity,
                this._filterAttributeValues,
                this._matchCase
            )
        );
    }

    applyFilter(filterValue: string) {
        this._filterValue = filterValue;
        if (!this._filterUsed) {
            this._filterUsed = true;
        }
        this.filterChanged.emit(
            new FilterArgument(
                this._filterValue,
                this._filterActivity,
                this._filterAttributeValues,
                this._matchCase
            )
        );
    }
}
