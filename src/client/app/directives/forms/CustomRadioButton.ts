/// <reference path="../../../../../typings/tsd.d.ts" />

import { Inject, Attribute, Component, View, NgFor, ElementRef, CSSClass, formDirectives } from 'angular2/angular2';
import {Dispatcher} from 'app/services/Dispatcher';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'custom__radio__button',
	properties: ['group','value','icon', 'checked']
})

@View({
	templateUrl: 'app/directives/forms/CustomRadioButton.html',
	styleUrls: ['app/directives/forms/CustomRadioButton.css'],
	directives: [formDirectives, CSSClass]
})

export class CustomRadioButton {
	
	dispatcher: any;
	classMap : {};
	input: any;
	
	
	constructor(public el: ElementRef, @Attribute('checked') checked: Boolean,  @Attribute('group') public group: String) {
		this.dispatcher = Dispatcher.getInstance();
		this.dispatcher.subscribe('form.radio', this.group + '.update', this.remove);
		
		this.input = this.el.nativeElement.getElementsByTagName('input')[0];
		
		if (checked) {
			this.check()
		}
	}
	
	check = () => {
		this.dispatcher.publish('form.radio',this.group + '.update', null);
		this.classMap = { 'active': true };
		this.input.checked = true;
	}
	
	remove = () => {
		this.input.checked = false;
		this.classMap = { 'active': false };
	}
}