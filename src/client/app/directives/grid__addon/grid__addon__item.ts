import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';


@Component({
	selector: 'grid-addon-item',
	properties: ['addon']

})

@View({
	templateUrl: 'app/directives/grid__addon/grid__addon__item.html',
	styleUrls: ['app/directives/grid__addon/grid__addon__item.css'],
	directives: [NgClass]
})

@Inject(Dispatcher)
export class GridAddonItem {
	constructor(public dispatcher: Dispatcher){
		
	}
	// Object Events
	open(value) {
		console.log('hi');
		this.dispatcher.publish('addons', 'open.modal', value);
	}
}