/// <reference path="../../../../../../typings/tsd.d.ts" />

/*
 *   Imports
 */
import {Component, View, Host, EventEmitter, LifecycleEvent} from 'angular2/angular2';
import {ModalPopup, ModalSlide} from 'app/directives/modal/modals.module';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
	selector: 'addons',
	host: {'actionBarVisible':'actionBarVisible'},
	lifecycle: [LifecycleEvent.onDestroy]

})
@View({

	directives: [ angularDirectives, appDirectives, ModalPopup ],
	templateUrl : './app/components/membership/addons/addons.html',
	styleUrls: ['./app/components/membership/addons/addons.css']
})

export class MembershipAddons {

	constructor(public dispatcher: Dispatcher){
		this.dispatcher.publish('Membership','actionBar.update','Choose Your Options');
	}
	onDestroy(){
		this.dispatcher.publish('Membership','actionBar.update','');
		this.dispatcher = null;
	}

}