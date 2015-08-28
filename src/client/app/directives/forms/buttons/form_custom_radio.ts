import { Inject, Attribute, Component, View, NgFor, ElementRef, NgClass, FORM_DIRECTIVES, EventEmitter } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
    selector: 'form-custom-radio',
	properties: ['group','value','icon', 'checked', 'classMap'],
	bindings: [
		Dispatcher
	]
})

@View({
  templateUrl: 'app/directives/forms/buttons/form_custom_radio.html',
  styleUrls: ['app/directives/forms/buttons/form_custom_radio.css'],
	directives: [FORM_DIRECTIVES, NgClass]
})


export class FormCustomRadio {
	checked: string;
	group: string;

	constructor(
		@Attribute('checked') checked: Boolean, 
		@Attribute('group') group: string,
		@Attribute('class') public initialClasses: any,
		public dispatcher: Dispatcher ) {
		
		this.group = group;
		this.dispatcher.subscribe('form.radio', this.group + '.update', this.remove);
		if (checked) {
			this.check();
		}
	}
	check = ($event?) => {
		console.log($event);
		this.dispatcher.publish('form.radio', this.group + '.update', null);
		this.initialClasses = {'active': true};
		this.checked = 'checked';
	};
	remove = () => {
		this.checked = '';
		this.initialClasses = { 'active': false };
	};
}
