/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
 
import {Modal} from './modal/modal';
import {AddonGrid, AddonGridItem, AddonGridPopup} from './addonGrid/AddonGrid.module';

// global App only directives
export var appDirectives: Array<any> = [
  Modal, 
  AddonGridItem, 
  AddonGridPopup 
];

