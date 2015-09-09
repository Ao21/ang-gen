import {Inject, Component, View, Host, ViewEncapsulation, NgFor, NgIf, ElementRef,LifecycleEvent, EventEmitter} from 'angular2/angular2';
import {GridAddonItem, GridAddonPopup} from 'app/directives/addons_list/addons.module';
import {MembershipStore, MembershipState, MembershipService} from 'app/services/membership.service';
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
	membershipState: any;
	initialState: any;
	dispatcher: any;
	addonService: any;
	selectedAddon: any;
	initialFilter: any;
	rescueMeChecked: boolean;


	constructor(
		addonService: AddonService, 
		dispatcher: Dispatcher,
		membershipStore: MembershipStore
		) {
			
		this.addonService = addonService;
		this.dispatcher = dispatcher;
		
		this.state = addonService.get('addons');
		this.membershipState = membershipStore.get();
		
		this.rescueMeChecked = this.membershipState.addons;
	
		
		this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
		this.onUpdateCheckbox(this.membershipState.addons);
	}
	
	onAddRescuePlus = () => {
		this.initialFilter = {'default':{'*':'*'},'rescueMe':{'pkg':'*'}}
	}
	
	onRemoveRescuePlus = () => {
		this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
	}
	
	onUpdateCheckbox(checked){
		if(checked) {
			this.onAddRescuePlus();
		}
		else {
			this.onRemoveRescuePlus();
		}
	}

	
	onDestroy() {

		this.dispatcher = null;
	}
}