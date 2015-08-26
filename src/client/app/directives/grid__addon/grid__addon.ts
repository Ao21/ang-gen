import {Inject, Component, View, ViewEncapsulation, NgFor, NgIf, ElementRef } from 'angular2/angular2';
import {GridAddonItem, GridAddonPopup} from 'app/directives/grid__addon/modules';
import {ModalSlide, ModalCreate} from '../modal/modals.module';
import {Dispatcher} from 'app/services/services';
import {AddonService} from 'app/services/addon.service';

import {FilterPipe} from 'app/pipes/filter.pipe';

@Component({
	selector: 'grid-addon',
	properties: ['title'],
	bindings: [
		Dispatcher,
		ModalCreate,
		AddonService
	]

})

@View({
	templateUrl: 'app/directives/grid__addon/grid__addon.html',
	styleUrls: ['app/directives/grid__addon/grid__addon.css'],
	directives: [NgFor, NgIf, GridAddonItem, ModalSlide, GridAddonPopup],
	pipes: [FilterPipe]
})

export class GridAddon {
	state: any;
	addons: any;
	selectedAddon: any;

	constructor(
		public addonService: AddonService, 
		public elRef:ElementRef,
		public dispatcher: Dispatcher,
		public mCreate: ModalCreate
		) {
			console.log(AddonService)
		this.addons = addonService.get('addons')
		this.dispatcher.subscribe('addons','group.all', this.onAddRescuePlus);
	}
	
	onAddRescuePlus = () => {
		_.map(this.addons, function(e){
			return e.pkg = 'default';
		})
	}
	
	addRescuePlus = () => {
		this.dispatcher.publish('addons','group.all', null);
	}
}