/// <reference path="../../../../../typings/tsd.d.ts" />

import { Inject, Component, View, ViewEncapsulation, NgFor, ElementRef } from 'angular2/angular2';
import {Dispatcher} from 'app/services/Dispatcher';


@Component({
	selector: 'addon__grid__popup',
	properties: ['details','icon']
})

@View({
	templateUrl: 'app/directives/addonGrid/AddonGridPopup.html'
})

export class AddonGridPopup {
	icon: string;
	details: string;
	constructor(public el: ElementRef) {
		const dispatcher = Dispatcher.getInstance();
    	dispatcher.subscribe('addons','open.modal', this.openModal);
	}

	openModal = (data:any, msg: any): void => {
		this.icon = data.icon;
		this.details = data.name;
	} 
}