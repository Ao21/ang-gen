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
		{name: 'Roadside Rescue', icon: '', pkg: 'default', free: false, desc: ''},
		{name: 'Roadside Rescue', icon: '', pkg: 'default', free: false, desc: ''},
		{name: 'Roadside Rescue', icon: '', pkg: 'default', free: false, desc: ''},
		{name: 'Roadside Rescue', icon: '', pkg: 'rescuePlus', free: false, desc: ''},
		{name: 'Roadside Rescue', icon: '', pkg: 'rescuePlus', free: false, desc: ''}
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



