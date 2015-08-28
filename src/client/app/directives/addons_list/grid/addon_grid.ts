import {Inject, Component, View, ViewEncapsulation, NgFor, NgIf, ElementRef } from 'angular2/angular2';
import {GridAddonItem, GridAddonPopup} from 'app/directives/addons_list/addons.module';

import {Dispatcher} from 'app/services/services';
import {AddonService} from 'app/services/addon.service';
import {FilterPipe} from 'app/pipes/filter.pipe';

@Component({
	selector: 'grid-addon',
	properties: ['title'],
	bindings: [
		Dispatcher,
		AddonService
	]

})

@View({
	templateUrl: 'app/directives/addons_list/grid/addon_grid.html',
	styleUrls: ['app/directives/addons_list/grid/addon_grid.css'],
	directives: [NgFor, NgIf, GridAddonItem, GridAddonPopup],
	pipes: [FilterPipe]
})

export class GridAddon {
	state: any;
	addons: any;
	selectedAddon: any;

	constructor(
		public addonService: AddonService, 
		public elRef:ElementRef,
		public dispatcher: Dispatcher
		) {
			console.log(AddonService)
		this.addons = addonService.get('addons')
		this.dispatcher.subscribe('addons','group.all', this.onAddRescuePlus);
	}
	
	onAddRescuePlus = () => {
		_.map(this.addons, function(e: any){
			return e.pkg = 'default';
		})
	}
	
	addRescuePlus = () => {
		this.dispatcher.publish('addons','group.all', null);
	}
}