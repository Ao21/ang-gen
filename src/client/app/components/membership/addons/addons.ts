import {Component, View, Host, EventEmitter, LifecycleEvent} from 'angular2/angular2';
import {ModalPopup, ModalSlide} from 'app/directives/modal/modals.module';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {MembershipStore, MembershipState} from 'app/services/membership.service';

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
	state: MembershipState;
	constructor(public dispatcher: Dispatcher, public store: MembershipStore){
		this.activate();
	}
	
	activate() {
		this.dispatcher.publish('Membership.state','update', {
			prop: 'actionBar.title',
			value: 'Choose Your Options'
		})
	}
	
	onDestroy(){
		this.dispatcher.publish('Membership.state','update', {
			prop: 'actionBar.title',
			value: ''
		})
		this.dispatcher = null;
	}

}