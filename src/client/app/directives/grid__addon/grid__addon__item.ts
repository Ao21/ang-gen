/// <reference path="../../../../../typings/tsd.d.ts" />

import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef, CSSClass } from 'angular2/angular2';

import {Dispatcher} from 'app/services/Dispatcher';

@Component({
  selector: 'grid__addon__item',
	properties: ['addon']

})

@View({
        templateUrl: 'app/directives/grid__addon/grid__addon__item.html',
        styleUrls: ['app/directives/grid__addon/grid__addon__item.css'],
	directives: [CSSClass]

})

export class GridAddonItem {
	constructor() {
	}
	open(value) {
		const dispatcher = Dispatcher.getInstance();
		//dispatcher.publish('addons','open.modal', value)
		dispatcher.publish('addons','group.all', value)
	}

}