import {Inject, Component, View, ViewEncapsulation, NgFor, NgIf, ElementRef, Pipes } from 'angular2/angular2';
import {GridAddonItem} from './grid__addon__item';
import {Modal} from 'app/directives/modal/modal'
import {AddonService} from 'app/services/AddonService';
import {Dispatcher} from 'app/services/Dispatcher';

import {appPipes} from 'app/pipes/pipes';

@Component({
	selector: 'grid-addon',
	properties: ['title'],
	viewBindings: [
		appPipes
	]
})

@View({
	templateUrl: 'app/directives/grid__addon/grid__addon.html',
	styleUrls: ['app/directives/grid__addon/grid__addon.css'],
	directives: [NgFor, NgIf, GridAddonItem, Modal]
})

export class GridAddon {
	state: any;
	addons: any;
	dispatcher: any;
	selectedAddon: any;

	constructor(public addonService: AddonService, public elRef:ElementRef) {
		this.dispatcher = Dispatcher.getInstance();
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