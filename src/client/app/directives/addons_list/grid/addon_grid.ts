import {Inject, Component, View, ViewEncapsulation, NgFor, NgIf, ElementRef,LifecycleEvent} from 'angular2/angular2';
import {GridAddonItem, GridAddonPopup} from 'app/directives/addons_list/addons.module';

import {Dispatcher} from 'app/services/services';
import {AddonService} from 'app/services/addon.service';
import {FilterPipe} from 'app/pipes/filter.pipe';

@Component({
	selector: 'grid-addon',
	properties: ['title'],
	bindings: [
		
	],
	lifecycle: [LifecycleEvent.onDestroy]

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
	dispatcher: any;
	selectedAddon: any;

	constructor(
		addonService: AddonService, 
		public elRef:ElementRef,
		dispatcher: Dispatcher
		) {
		this.dispatcher = dispatcher;
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
	
	onDestroy() {
		this.dispatcher.unsubscribe('addons', 'group.all');
		this.dispatcher = null;
	}
}