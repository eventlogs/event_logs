import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
    selector: 'app-change-view-button',
    templateUrl: './change-view-button.component.html',
    styleUrls: ['./change-view-button.component.scss'],
})
export class ChangeViewButtonComponent {
    @Input() buttonText: string = 'Change View';
    @Output() changeViewEvent = new EventEmitter<string>();

    public classReference = ChangeViewButtonComponent;

    public static readonly valueChainView = 'valueChainView';
    public static readonly directlyFollowsGraphView =
        'directlyFollowsGraphView';
    public static readonly logInformationView = 'logInformationView';

    currentView: string = ChangeViewButtonComponent.valueChainView;

    changeView(nextView: string) {
        this.changeViewEvent.emit(nextView);
        this.currentView = nextView;
    }
}
