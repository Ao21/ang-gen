import {Component, View, Inject, NgClass, EventEmitter, Attribute, OnInit} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox',
	properties: ['init'],
	events: ['update']

})


@View({
	templateUrl: 'app/directives/buttons/checkbox.html',
	styleUrls: ['app/directives/buttons/checkbox.css'],
	directives: [NgClass]
})

export class CheckboxButton implements OnInit{
	update: EventEmitter;
	checked: Boolean;
	init: Boolean;
	
	constructor() {
		this.update = new EventEmitter();
	}
	
	onInit(){
		this.checked = this.init;
	}
	
	check = () => {
		this.checked = !this.checked;
		this.update.next(this.checked);
	}
}