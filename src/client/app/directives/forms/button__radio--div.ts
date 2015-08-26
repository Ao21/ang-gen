import { Inject, Attribute, Component, View, NgFor, ElementRef, NgClass, FORM_DIRECTIVES } from 'angular2/angular2';
import {Dispatcher} from 'app/services/Dispatcher';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
    selector: 'button-radio-div',
	properties: ['group','value','icon', 'checked', 'classMap']
})

@View({
  templateUrl: 'app/directives/forms/button__radio--div.html',
  styleUrls: ['app/directives/forms/button__radio--div.css'],
	directives: [FORM_DIRECTIVES, NgClass]
})

export class ButtonRadioDiv {
	dispatcher: any;
	checked: string;
	group: string;

	constructor(@Attribute('checked') checked: Boolean, 
		@Attribute('group') group: string,
		@Attribute('class') public initialClasses: any) {
		this.group = group;
		this.dispatcher = Dispatcher.getInstance();
		this.dispatcher.subscribe('form.radio', this.group + '.update', this.remove);
		if (checked) {
			this.check();
		}
	}
	check = () => {
		this.dispatcher.publish('form.radio', this.group + '.update', null);
		this.initialClasses = {'active': true};
		this.checked = 'checked';
	};
	remove = () => {
		this.checked = '';
		this.initialClasses = { 'active': false };
	};
}
