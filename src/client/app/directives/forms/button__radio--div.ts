import { Inject, Attribute, Component, View, NgFor, ElementRef, CSSClass, formDirectives } from 'angular2/angular2';
import {Dispatcher} from 'app/services/Dispatcher';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
    selector: 'button-radio-div',
	properties: ['group','value','icon', 'checked']
})

@View({
  templateUrl: 'app/directives/forms/button__radio--div.html',
  styleUrls: ['app/directives/forms/button__radio--div.css'],
	directives: [formDirectives, CSSClass]
})

export class ButtonRadioDiv {
	dispatcher: any;
	classMap : {};
	checked: string;
	group: string;

	constructor(@Attribute('checked') checked: Boolean, @Attribute('group') group: string) {
		this.group = group;
		this.dispatcher = Dispatcher.getInstance();
		this.dispatcher.subscribe('form.radio', this.group + '.update', this.remove);
		if (checked) {
			this.check();
		}
	}
	check = () => {
		this.dispatcher.publish('form.radio', this.group + '.update', null);
		this.classMap = { 'active': true };
		this.checked = 'checked';
	};
	remove = () => {
		this.checked = '';
		this.classMap = { 'active': false };
	};
}
