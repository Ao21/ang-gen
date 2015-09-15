/// <reference path="../../../typings/tsd.d.ts" />

import {bootstrap} from 'angular2/angular2';

// /*
//  * Angular Modules
//  */

import { locationInjectables } from './core/location';
import {helperInjectables} from './helpers/helpers';

/*
 * App Services
 * our collection of injectables services
//  */
import {appServices} from './services/services';
import {appDirectives, angularDirectives} from './directives/directives';

var universalInjectables = [
  locationInjectables,
  helperInjectables,
  appServices
]

/*
 * App Component
 * our top level component that holds all of our components
 */
import {App} from './components/app';



bootstrap(
  // Top Level Component
  App,
  [universalInjectables]
  
);

