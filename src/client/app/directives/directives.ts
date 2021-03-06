/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */

import {CORE_DIRECTIVES, FORM_DIRECTIVES} from 'angular2/angular2';
import {ROUTER_DIRECTIVES} from 'angular2/router';



import {GridAddon} from './addons_list/grid/addon_grid'
import {GridAddonItem, GridAddonPopup} from './addons_list/addons_modules'
import {FormCustomRadio, FormIncrementor, Tabs, Tab, FormCustomRadioContainer, Switch} from './forms/forms_modules';
import {BackgroundImage} from './generic/background_image';
import {CheckboxButton} from './buttons/checkbox';
import {ActionBar} from './nav/action_bar';
import {ModalPopup, ModalSlide} from './modal/modals_modules';
import {Accordian, AccordianItem} from './accordian/accordian_modules';

// global App only directives
export var appDirectives: Array<any> = [
	ModalPopup,
	ModalSlide,
	FormIncrementor,
	BackgroundImage,
	GridAddon,
	GridAddonItem,
	GridAddonPopup,
	FormCustomRadio,
	FormCustomRadioContainer,
	Switch,
	CheckboxButton,
	Tabs,
	Tab,
	ActionBar,
	Accordian,
	AccordianItem
	

];

// global Angular core and other Angular module directives (form/router)
export var angularDirectives: Array<any> = [
// Angular's core directives
	CORE_DIRECTIVES,

// Angular's form directives
	FORM_DIRECTIVES,

// Angular's router
	ROUTER_DIRECTIVES
];
