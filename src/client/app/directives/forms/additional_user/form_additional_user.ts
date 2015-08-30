import {View, Component, ViewEncapsulation} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services'
import {HorizontalScroller, HorizontalScrollerRef, HorizontalScrollerConfig} from 'app/directives/scroller/horizontal_scroller'

@Component({
	selector:'form-additional-user',
	properties: ['numCoconuts'],
})

@View({
	templateUrl: 'app/directives/forms/additional_user/form_additional_user.html',
	styleUrls: ['app/directives/forms/additional_user/form_additional_user.css']
})

export class FormAdditionalUser {
	numCoconuts: number;
	horizontalRef: HorizontalScrollerRef;
	constructor() {
		this.numCoconuts = 0;
		
	}
	goTo(){
		this.horizontalRef.goToEl('Form-1');
	}
}


@Component({
	selector: 'simple-dialog',
	properties: ['numCoconuts'],
})
@View({
	encapsulation: ViewEncapsulation.NONE,
	template: `
    <h2>This is the dialog content</h2>
    <p>There are {{numCoconuts}} coconuts.</p>
    <p>Return: <input (input)="updateValue($event)"></p>
    <button type="button" (click)="done()">Done</button>
  `
})
export class SimpleDialogComponent {
	numCoconuts: number;
	horizontalRef: HorizontalScrollerRef;
	toReturn: string;
	
	constructor() {
		this.numCoconuts = 0;
		this.toReturn = '';

	}

	updateValue(event) {
		
	}

	done() {
		this.horizontalRef.close(this.toReturn);
	}
}
