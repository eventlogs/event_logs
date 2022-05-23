import {ComponentFixture, TestBed} from '@angular/core/testing';
import {UploadButtonComponent} from './upload-button.component';

describe('UploadButtonComponent', () => {
    let component: UploadButtonComponent;
    let fixture: ComponentFixture<UploadButtonComponent>;

    beforeEach(async () => {
        await TestBed.configureTestingModule({
            declarations: [UploadButtonComponent]
        })
            .compileComponents();
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(UploadButtonComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should react to file upload field change', () => {
        const element = fixture.nativeElement;
        const input = element.querySelector('.file-input');
        spyOn(component, 'handleFileInput');

        input.dispatchEvent(new Event('change'));

        expect(component.handleFileInput).toHaveBeenCalled();
    });

    it('should emit event with file content', () => {
        const element = fixture.nativeElement;
        const input = element.querySelector('.file-input');
        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(new File([exampleFileContent], 'test-file.txt'));
        input.files = dataTransfer.files;

        component.newFileUploadedEvent.subscribe((fileContent: string) => {
            expect(fileContent).toBe(exampleFileContent);
        })
        input.dispatchEvent(new Event('change'));
    });

    it('should throw warning if file is not .txt', () => {
        const element = fixture.nativeElement;
        const input = element.querySelector('.file-input');

        const dataTransfer = new DataTransfer()
        dataTransfer.items.add(new File([''], 'test-file.xes'))
        input.files = dataTransfer.files;

        spyOn(window, "alert");

        input.dispatchEvent(new InputEvent('change'));

        expect(window.alert).toHaveBeenCalledWith('Nur Textdateien vom Typ .log werden derzeit unterstützt');
    });

    const exampleFileContent = '.type log\n.events\ne1 a\ne2 b\n.arcs\ne1 2';
});
