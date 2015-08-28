/// <reference path="../../../../../../typings/tsd.d.ts" />

/*
 *   Imports
 */
import {Component, View} from 'angular2/angular2';
import {ModalPopup, ModalSlide} from 'app/directives/modal/modals.module';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
	selector: 'addons'
})
@View({
	directives: [ angularDirectives, appDirectives, ModalPopup ],
	templateUrl : './app/components/membership/addons/addons.html'
})

export class MembershipAddons {
	
}