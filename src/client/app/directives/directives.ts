/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */

import {coreDirectives, formDirectives} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

import {Modal} from './modal/modal';
import {GridAddon, GridAddonItem, GridAddonPopup} from './grid__addon/grid__addon.module';
import {ButtonRadioDiv} from './forms/forms.module';


// global App only directives
export var appDirectives: Array<any> = [
  Modal,
  GridAddon,
  GridAddonItem,
  GridAddonPopup,
  ButtonRadioDiv
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
