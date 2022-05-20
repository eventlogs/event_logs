import {Component, OnDestroy} from '@angular/core';
import {FormControl} from '@angular/forms';
import {ParserService} from './services/parser.service';
import {DisplayService} from './services/display.service';
import {debounceTime, Subscription} from 'rxjs';
import { EventLog } from './classes/EventLog/eventlog';
import { XesService } from './services/xes.service';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnDestroy {

    public textareaFc: FormControl;

    private _sub: Subscription;

    private eventLog: EventLog

    constructor(private _parserService: ParserService,
                private _displayService: DisplayService, private _xesService: XesService) {
        this.textareaFc = new FormControl();
        this._sub = this.textareaFc.valueChanges.pipe(debounceTime(400)).subscribe(val => this.processSourceChange(val));
        this.textareaFc.setValue(this.textareaExampleValue());
        this.eventLog = this._parserService.parse(this.textareaExampleValue());
    }

    ngOnDestroy(): void {
        this._sub.unsubscribe();
    }

    private processSourceChange(newSource: string) {
        const result = this._parserService.parse(newSource);
        if (result !== undefined) {
            this.eventLog = result;
            this._displayService.displayEventLog(result);
        }
    }

    updateTextarea(fileContent: string) {
        this.textareaFc.setValue(fileContent);
    }

    getTextareaValue() {
        return this.textareaFc.value
    }

    textareaExampleValue() {
        return `.type log
.attributes
case-id
activity
booleanValue
intValue
floatValue
dateValue
stringValue
.events
1 Auto true 1 1.3 2020-01-31 basadf
1 Schiff true 2 2.3 2020-01-31 dasf
2 BusBus false 3 4.5 2020-01-31 adsf
2 Bus false 4 6.7 2020-01-31 adfd`
    }

    getXesValue() {
        return this._xesService.generate(this.eventLog);
    }
}
