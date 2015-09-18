import {Component, View, Host, EventEmitter, OnDestroy} from 'angular2/angular2';
import {ModalPopup, ModalSlide} from 'app/directives/modal/modals_modules';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {MembershipStoreActions} from 'app/services/membership_service';

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
	constructor(public mbStoreActions: MembershipStoreActions){
		this.activate();
	}
	
	activate() {
		this.mbStoreActions.update('actionBar.title', 'Choose Your Options')
		this.mbStoreActions.update('actionBar.visible', true)
	}
	
	onDestroy(){
		this.mbStoreActions.update('actionBar.title', '')
	}

}