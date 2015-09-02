import {Component, View, Inject, NgClass, EventEmitter} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox',
	viewBindings: [Dispatcher],
	properties: ['checked'],
	events: ['updateCheckbox: updatecheckbox']

})

@View({
	templateUrl: 'app/directives/buttons/checkbox.html',
	styleUrls: ['app/directives/buttons/checkbox.css'],
	directives: [NgClass]
})

@Inject(Dispatcher)
export class CheckboxButton {
	classMap: any;
	checked: boolean;
	updateCheckbox: EventEmitter;
	
	constructor(public dispatcher: Dispatcher)
	{
		this.checked = false;
		this.classMap = {};
		this.updateCheckbox = new EventEmitter();
	}
	check = () =>{
		this.checked = !this.checked;
		this.classMap = {checked:this.checked};
		this.updateCheckbox.next(this.checked);
	}
}