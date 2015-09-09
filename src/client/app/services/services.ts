/// <reference path="../../../../typings/tsd.d.ts" />

import {bind} from 'angular2/angular2';
import {addonInjectables} from './addon.service';
import {MembershipStore, MembershipService} from './membership.service';

export {Dispatcher} from './dispatcher.service';
export {MembershipStore, MembershipService} from './membership.service';

import {Dispatcher} from './dispatcher.service';



// Include injectables that you want to have globally throughout our app
export var appServices: Array<any> = [
  addonInjectables,
	MembershipStore,
	MembershipService,
 	Dispatcher
];


