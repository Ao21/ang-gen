/// <reference path="../../../../../typings/tsd.d.ts" />

import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef } from 'angular2/angular2';
import {GridAddonItem} from './grid__addon__item';
import {GridAddonPopup} from './grid__addon__popup';
import {Modal} from 'app/directives/modal/modal'
import {AddonService} from 'app/services/AddonService';
import {Dispatcher} from 'app/services/Dispatcher';


@Component({
  selector: 'grid__addon',
	properties: ['title']

})

@View({
  templateUrl: 'app/directives/grid__addon/grid__addon.html',

	directives: [
		NgFor,
		AddonGridItem,
		AddonGridPopup,
		Modal

		]
})

export class AddonGrid {
	state: any;
	addons: any;
	dispatcher: any;
	selectedAddon: any;

	constructor(public addonService: AddonService, public elRef:ElementRef) {
		this.dispatcher = Dispatcher.getInstance();
		this.addons = addonService.get('addons')
		this.dispatcher.subscribe('addons','group.all', this.swapAddons);
	}
	swapAddons = () => {
		_.map(this.addons, function(e){
			return e.pkg = 'default';
		})
	}
}