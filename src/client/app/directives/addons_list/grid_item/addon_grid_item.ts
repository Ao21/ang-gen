import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';


@Component({
	selector: 'grid-addon-item',
	properties: ['addon']

})

@View({
	templateUrl: 'app/directives/addons_list/grid_item/addon_grid_item.html',
	styleUrls: ['app/directives/addons_list/grid_item/addon_grid_item.css'],
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