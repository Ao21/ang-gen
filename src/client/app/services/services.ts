/// <reference path="../../../../typings/tsd.d.ts" />

import {bind} from 'angular2/angular2';

import {addonInjectables} from './AddonService';


// Include injectables that you want to have globally throughout our app
export var appServicesInjectables: Array<any> = [
  addonInjectables

];
