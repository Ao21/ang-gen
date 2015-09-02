/// <reference path="../../../../typings/tsd.d.ts" />


import { Component } from 'angular2/angular2';
import { Inject, Injectable, bind } from 'angular2/angular2';

export interface IAddon {
	name: string;
	icon: string;
	pkg: string;
	free: Boolean;
	desc: string;
}

interface IAddonState {
  addons: Array<IAddon>
}

let initAddonState:IAddonState = {
	addons: [
		{name: 'Roadside Rescue', icon: 'images/icons/roadsideRescue.svg', pkg: 'default', free: false, desc: ''},
		{name: '24/7 Emergency Cover', icon: 'images/icons/emergenyCover.svg', pkg: 'default', free: false, desc: ''},
		{name: 'Cover on your doorstep', icon: 'images/icons/doorstep.svg', pkg: 'default', free: false, desc: ''},
		{name: 'Any vehicle cover', icon: 'images/icons/vehicleCover.svg', pkg: 'default', free: false, desc: ''},
		{name: 'UK Cover', icon: 'images/icons/ukCover.svg', pkg: 'default', free: false, desc: ''},
		{name: 'Home Start', icon: 'images/icons/homeStart.svg', pkg: 'default', free: true, desc: ''},
		{name: 'AA Rewards', icon: 'images/icons/rewards.svg', pkg: 'default', free: false, desc: ''},
		{name: 'Onward Travel', icon: 'images/icons/onwardTravel.svg', pkg: 'rescuePlus', free: false, desc: ''},
		{name: 'National Recovery', icon: 'images/icons/nationalRecover.svg', pkg: 'rescuePlus', free: false, desc: ''},
		{name: 'Accom or Travel Expenses', icon: 'images/icons/accomodation.svg', pkg: 'rescuePlus', free: false, desc: ''},
		
	]
};


class Addon implements IAddon {
	name: string;
	icon: string;
	pkg: string;
	free: Boolean;
	desc: string;
	constructor(name: string, icon: string, pkg: string, free: Boolean, desc: string) {
		this.name = name;
		this.icon = icon;
		this.pkg = pkg;
		this.free = free;
		this.desc = desc;
	}
}

@Injectable()
export class AddonService {
	
	_state: IAddonState;
	constructor(@Inject('initAddonState') state: IAddonState) {
		this._state = state;
	}
	get(type?: string) {
    	return (type) ? this._state[type] : this._state;
  	}
	
}


// export our injectables for this module
export var addonInjectables: Array<any> = [
	bind('initAddonState').toValue(initAddonState),	
  	bind(AddonService).toClass(AddonService)
];



