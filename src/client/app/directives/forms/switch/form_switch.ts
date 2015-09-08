import {Component, View, LifecycleEvent, Attribute} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {isPresent} from 'angular2/src/facade/lang';
import {NumberWrapper} from 'angular2/src/facade/lang';


@Component({
	selector: 'switch',
	properties: ['checked', 'disabled'],
	host: {
		'role': 'checkbox',
		'[attr.aria-checked]': 'checked',
		'[attr.aria-disabled]': 'disabled_',
		'(keydown)': 'onKeydown($event)',
	}
})

@View({
	templateUrl: 'app/directives/forms/switch/form_switch.html',
	styleUrls: ['app/directives/forms/switch/form_switch.css'],
})

export class Switch {
	checked: boolean;
	tabindex: number;
	disabled: boolean;
	
	constructor(@Attribute('tabindex') tabindex: string) {
		this.tabindex = isPresent(tabindex) ? NumberWrapper.parseInt(tabindex, 10) : 0;
		this.disabled = false
	}
	
	 toggle(event) {
		if (this.disabled) {
			event.stopPropagation();
			return;
		}
	this.checked = !this.checked;
	}
}