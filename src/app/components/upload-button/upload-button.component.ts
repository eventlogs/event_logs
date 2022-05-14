import {
    Component,
    Input,
    Output,
    EventEmitter,
} from '@angular/core';

@Component({
    selector: 'upload-button',
    templateUrl: './upload-button.component.html',
    styleUrls: ['./upload-button.component.scss']
})
export class UploadButtonComponent {

    @Input() buttonText: string | undefined;
    @Input() buttonIcon: string | undefined;
    @Output() newFileUploadedEvent = new EventEmitter<string>();

    constructor() {
    }

    prevent(e: Event) {
        e.preventDefault();
        e.stopPropagation();
    }

    hoverStart(e: MouseEvent) {
        this.prevent(e);
        const target = (e.target as HTMLElement);
        target.classList.add('mouse-hover');
    }

    hoverEnd(e: MouseEvent) {
        this.prevent(e);
        const target = (e.target as HTMLElement);
        target.classList.remove('mouse-hover');
    }

    handleFileInput(event: Event) {
        const target = event.target as HTMLInputElement;
        const files = target.files as FileList;
        if (!files[0].name.endsWith('.txt')) {
            alert('Nur .txt-Dateien vom Typ .log werden derzeit unterstützt');
            return;
        }
        this.readAndEmitFile(files[0]);
    }

    readAndEmitFile(file: File) {
        let fileReader = new FileReader();
        fileReader.onload = () => {
            let fileContent = fileReader.result as string;
            this.newFileUploadedEvent.emit(fileContent);
        }
        fileReader.readAsText(file);
    }

}
