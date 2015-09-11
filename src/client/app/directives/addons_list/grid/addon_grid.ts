import {Inject, Component, View, Host, ViewEncapsulation, NgFor, NgIf, ElementRef,OnDestroy, EventEmitter} from 'angular2/angular2';
import {GridAddonItem, GridAddonPopup} from 'app/directives/addons_list/addons.module';
import {MembershipStore, MembershipState, MembershipConsts} from 'app/services/membership.service';
import {CheckboxButton} from 'app/directives/buttons/checkbox'
import {Dispatcher} from 'app/services/services';
import {AddonService} from 'app/services/addon.service';
import {FilterPipe} from 'app/pipes/filter.pipe';


@Component({
	selector: 'grid-addon',
	properties: ['title'],

})

@View({
	templateUrl: 'app/directives/addons_list/grid/addon_grid.html',
	styleUrls: ['app/directives/addons_list/grid/addon_grid.css'],
	directives: [NgFor, NgIf, GridAddonItem, GridAddonPopup, CheckboxButton],
	pipes: [FilterPipe]
})

export class GridAddon implements OnDestroy {
	state: any;
	membershipState: any;
	initialState: any;
	selectedAddon: any;
	initialFilter: any;
	rescueMeChecked: boolean;


	constructor(
		public addonService: AddonService, 
		public dispatcher: Dispatcher,
		private membershipStore: MembershipStore
		) {
			this.state = addonService.get('addons');
			this.membershipState = membershipStore.get();
			this.rescueMeChecked = this.membershipState.addons;
			this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
			this.activate();
	}
	
	activate() {
		this.onUpdateCheckbox(this.membershipState.addons);
	};
	
	addRescuePlus = () => {
		var _state  = {addons:true};
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, _state);
		this.initialFilter = {'default':{'*':'*'},'rescueMe':{'pkg':'*'}}
	};
	
	removeRescuePlus = () => {
		var _state  = {addons:false};
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, _state);
		this.initialFilter = {'default':{'pkg':'default'},'rescueMe':{'pkg':'rescuePlus'}}
	};
	
	onUpdateCheckbox(checked){
		if(checked) {
			this.addRescuePlus();
		}
		else {
			this.removeRescuePlus();
		}
	};
	
	onDestroy() {
		this.dispatcher = null;
	};
}