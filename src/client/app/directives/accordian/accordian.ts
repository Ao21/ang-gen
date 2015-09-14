import {Component, View, EventEmitter} from 'angular2/angular2';

import {AccordianItem} from './accordian_item/accordian_item';

@Component({
	selector: 'accordian'

})

@View({
	templateUrl: 'app/directives/accordian/accordian.html',
	styleUrls: ['app/directives/accordian/accordian.css'],
	directives: []
})

export class Accordian {
	panels: any;
	selected: Number;
	onSelectPanel: EventEmitter;
	
	constructor(){
		this.panels = [];
		this.selected = 0;
		this.onSelectPanel = new EventEmitter;
	}
	
	addPanel(panel:AccordianItem){
		this.panels.push(panel);
		console.log(this.panels);
	}
	
	selectPanel(panel, i) {
		
	}
}