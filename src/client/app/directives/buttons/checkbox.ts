import {Component, View, Inject, NgClass, EventEmitter, Attribute} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox',
	properties: ['checked'],
	events: ['update']

})

@View({
	templateUrl: 'app/directives/buttons/checkbox.html',
	styleUrls: ['app/directives/buttons/checkbox.css'],
	directives: [NgClass]
})

export class CheckboxButton {
	checked: boolean;
	update: EventEmitter;
	
	constructor(@Attribute('checked') checked: boolean) {
		this.update = new EventEmitter();
	}
	
	check = () => {
		this.checked = !this.checked;
		this.update.next(this.checked);
	}
}