/// <reference path="../../../../typings/tsd.d.ts" />

import {bind} from 'angular2/angular2';
import {addonInjectables} from './addon_service';
import {MembershipStore} from './membership_service';

export {Dispatcher} from './dispatcher_service';
export {MembershipStore, MembershipConsts, MembershipState, MembershipForm, MembershipFormDefault} from './membership_service';

import {Dispatcher} from './dispatcher_service';



// Include injectables that you want to have globally throughout our app
export var appServices: Array<any> = [
  addonInjectables,
	MembershipStore,
 	Dispatcher
];


