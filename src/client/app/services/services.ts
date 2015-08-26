/// <reference path="../../../../typings/tsd.d.ts" />

import {bind} from 'angular2/angular2';
import {addonInjectables} from './addon.service';

export {Dispatcher} from './dispatcher.service';



// Include injectables that you want to have globally throughout our app
export var appServices: Array<any> = [
  addonInjectables

];


