/// <reference path="../../../../../typings/tsd.d.ts" />

import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef, CSSClass } from 'angular2/angular2';

import {Dispatcher} from 'app/services/Dispatcher';

@Component({
	selector: 'addon__grid__item',
	properties: ['addon']

})

@View({
	templateUrl: 'app/directives/addonGrid/AddonGridItem.html',
	styleUrls: ['app/directives/addonGrid/AddonGridItem.css'],
	directives: [CSSClass]

})

export class AddonGridItem {
	constructor() {
	}
	open(value) {
		const dispatcher = Dispatcher.getInstance();
		//dispatcher.publish('addons','open.modal', value)
		dispatcher.publish('addons','group.all', value)
	}

}