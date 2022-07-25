import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-export-menu-item',
    templateUrl: './export-menu-item.component.html',
    styleUrls: ['./export-menu-item.component.scss'],
})
export class ExportMenuItemComponent {
    @Input() buttonText: string | undefined;
    @Input() disabled: boolean = false;
    @Input() reimport: boolean = false;
    @Output() exportFile = new EventEmitter();
    @Output() processReimport = new EventEmitter();

    constructor() {}

    processMouseClick(e: MouseEvent) {
        this.exportFile.emit();
        if (this.reimport) {
            this.processReimport.emit();
        }
    }
}
