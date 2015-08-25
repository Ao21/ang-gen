/// <reference path="../../../typings/tsd.d.ts" />

import {bootstrap} from 'angular2/angular2';

/*
 * Angular Modules
 */
import {httpInjectables, formInjectables} from 'angular2/angular2';

import { locationInjectables } from './core/location';
import {helperInjectables} from './helpers/helpers';

/*
 * App Services
 * our collection of injectables services
 */
import {appServicesInjectables} from './services/services';
import {appDirectives, angularDirectives} from './directives/directives';

var universalInjectables = [
  httpInjectables,
  formInjectables,
  locationInjectables,
  
  angularDirectives,
  
  helperInjectables,
  appServicesInjectables,
  appDirectives
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

