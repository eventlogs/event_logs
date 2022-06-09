import { Component, Input } from '@angular/core';
import { saveAs } from 'file-saver';

@Component({
    selector: 'app-export-button',
    templateUrl: './export-button.component.html',
    styleUrls: ['./export-button.component.scss'],
})
export class ExportButtonComponent {
    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    @Input() fileContent: string = '';
    @Input() fileType: string = '';
    @Input() fileName: string = '';
    @Input() datePrefix: boolean = false;

    constructor() {}

    processMouseClick(e: MouseEvent) {
        let fileName = this.fileName;
        if (this.datePrefix) {
            fileName = new Date().toLocaleString() + '_' + fileName;
        }
        saveAs(new Blob([this.fileContent], { type: this.fileType }), fileName);
    }
}
