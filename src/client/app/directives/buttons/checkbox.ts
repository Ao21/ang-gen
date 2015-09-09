import {Component, View, Inject, NgClass, EventEmitter, Attribute} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox',
	viewBindings: [Dispatcher],
	properties: ['checked'],
	events: ['update']

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
	update: EventEmitter;
	
	constructor(
		public dispatcher: Dispatcher,
		@Attribute('checked') checked: boolean)
	{
		this.update = new EventEmitter();
		this.checked = checked;
		
		setTimeout( () => {
			console.log(this);
			console.log(this.checked)
			this.classMap = {checked:this.checked};
		},1)
		
	}
	check = () =>{
		this.checked = !this.checked;
		this.classMap = {checked:this.checked};
		this.update.next(this.checked);
	}
}