/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {routerDirectives} from 'angular2/router';

import {GridAddon} from './addons_list/grid/addon_grid'
import {GridAddonItem, GridAddonPopup} from './addons_list/addons.module'
import {FormCustomRadio, FormAdditionalUser, FormIncrementor, Tabs, Tab} from './forms/forms.modules';
import {BackgroundImage} from './generic/background_image';
import {CheckboxButton} from 'app/directives/buttons/checkbox';


// global App only directives
export var appDirectives: Array<any> = [
	FormIncrementor,
	BackgroundImage,
	GridAddon,
	GridAddonItem,
	GridAddonPopup,
	FormCustomRadio,
	FormAdditionalUser,
	CheckboxButton,
	Tabs,
	Tab

];

// global Angular core and other Angular module directives (form/router)
export var angularDirectives: Array<any> = [
// Angular's core directives
	CORE_DIRECTIVES,

// Angular's form directives
	FORM_DIRECTIVES,

// Angular's router
	routerDirectives
];
