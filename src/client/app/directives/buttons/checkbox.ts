import {Component, View, Inject, NgClass} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox',
	viewBindings: [Dispatcher],
	properties: ['checked']
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
	
	constructor(public dispatcher: Dispatcher)
	{
		this.checked = false;
		this.classMap = {};
	}
	check = () =>{
		this.checked = !this.checked;
		this.classMap = {checked:this.checked};
	}
}