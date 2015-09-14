import {Component, View, Host} from 'angular2/angular2';
import {Accordian} from './../accordian';

@Component({
	selector: 'accordian-item',
	properties: ['panelTitle']
})

@View({
	templateUrl: 'app/directives/accordian/accordian_item/accordian_item.html',
	
})
export class AccordianItem {
	isOpen: Boolean;
	
	constructor(@Host accordian: Accordian){
		accordian.addPanel(this)
	}
}