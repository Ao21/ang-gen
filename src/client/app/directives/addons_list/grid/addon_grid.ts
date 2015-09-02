import {Inject, Component, View, ViewEncapsulation, NgFor, NgIf, ElementRef,LifecycleEvent, EventEmitter} from 'angular2/angular2';
import {GridAddonItem, GridAddonPopup} from 'app/directives/addons_list/addons.module';

import {CheckboxButton} from 'app/directives/buttons/checkbox'
import {Dispatcher} from 'app/services/services';
import {AddonService} from 'app/services/addon.service';
import {FilterPipe} from 'app/pipes/filter.pipe';


@Component({
	selector: 'grid-addon',
	properties: ['title'],
	bindings: [
		
	],
	lifecycle: [LifecycleEvent.onDestroy],

	

})

@View({
	templateUrl: 'app/directives/addons_list/grid/addon_grid.html',
	styleUrls: ['app/directives/addons_list/grid/addon_grid.css'],
	directives: [NgFor, NgIf, GridAddonItem, GridAddonPopup, CheckboxButton],
	pipes: [FilterPipe]
})

export class GridAddon {
	state: any;
	initialState: any;
	dispatcher: any;
	addonService: any;
	selectedAddon: any;
	initialFilter: any;


	constructor(
		addonService: AddonService, 
		public elRef:ElementRef,
		dispatcher: Dispatcher
		) {
			
		this.addonService = addonService;
		this.dispatcher = dispatcher;
		
		this.state = addonService.get('addons');
		this.initialState = _.clone(this.state, true);
		
		this.dispatcher.subscribe('addons','group.all', this.onAddRescuePlus);
		this.dispatcher.subscribe('addons','group.original', this.onRemoveRescuePlus);
		
		this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
	}
	
	onAddRescuePlus = () => {
		this.initialFilter = {'default':{'*':'*'},'rescueMe':{'pkg':'*'}}
	}
	
	onRemoveRescuePlus = () => {
		this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
	}
	
	onUpdateCheckbox(checked){
		if(checked) {
			this.addRescuePlus();
		}
		else {
			this.removeRescuePlus();
		}
	}
	addRescuePlus = () => {
		this.dispatcher.publish('addons','group.all', null);
	}
	
	removeRescuePlus = () => {
		this.dispatcher.publish('addons','group.original', null);
	}
	
	onDestroy() {
		this.dispatcher.unsubscribe('addons', 'group.all');
		this.dispatcher = null;
	}
}