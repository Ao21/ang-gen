/// <reference path="../../../../typings/tsd.d.ts" />

import {bind} from 'angular2/angular2';
import {addonInjectables} from './addon.service';
import {MembershipStore} from './membership.service';

export {Dispatcher} from './dispatcher.service';
export {MembershipStore, MembershipConsts} from './membership.service';

import {Dispatcher} from './dispatcher.service';



// Include injectables that you want to have globally throughout our app
export var appServices: Array<any> = [
  addonInjectables,
	MembershipStore,
 	Dispatcher
];


