import {View, Component, ViewEncapsulation} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services'
import {MdHorizontal, MdHorizontalRef, MdHorizontalConfig} from 'app/directives/modal/modal.me'

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
	horizontalRef: MdHorizontalRef;
	constructor() {
		this.numCoconuts = 0;
		
	}
	goTo(){
		console.log(this);
		this.horizontalRef.goTo(1);
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
	horizontalRef: MdHorizontalRef;
	toReturn: string;
	
	constructor() {
		console.log(this);
		this.numCoconuts = 0;
		this.toReturn = '';

	}

	updateValue(event) {
		
	}

	done() {
		this.horizontalRef.close(this.toReturn);
	}
}
