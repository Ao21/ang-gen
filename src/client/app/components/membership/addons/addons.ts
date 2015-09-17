import {Component, View, Host, EventEmitter, OnDestroy} from 'angular2/angular2';
import {ModalPopup, ModalSlide} from 'app/directives/modal/modals_modules';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {MembershipStore, MembershipState, MembershipConsts} from 'app/services/membership_service';

@Component({
	selector: 'addons',
	host: {'actionBarVisible':'actionBarVisible'}

})
@View({
	directives: [ angularDirectives, appDirectives, ModalPopup ],
	templateUrl : './app/components/membership/addons/addons.html',
	styleUrls: ['./app/components/membership/addons/addons.css']
})

export class MembershipAddons implements OnDestroy {
	state: MembershipState;
	constructor(public dispatcher: Dispatcher, public store: MembershipStore){
		this.activate();
	}
	
	activate() {
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATE, {
			prop: 'actionBar.title',
			value: 'Choose Your Options'
		})
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATE, {
			prop: 'actionBar.visible',
			value: true
		});
	}
	
	onDestroy(){
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATE, {
			prop: 'actionBar.title',
			value: ''
		})
		this.dispatcher = null;
	}

}