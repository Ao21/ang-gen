/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */

import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

// global App only directives
export var appDirectives: Array<any> = [
  
];

// global Angular core and other Angular module directives (form/router)
export var angularDirectives: Array<any> = [
  // Angular's core directives
  coreDirectives,

  // Angular's form directives
  formDirectives,

  // Angular's router
  routerDirectives
];
