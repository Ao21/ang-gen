import {Component, View, Host, ChangeDetectionStrategy} from 'angular2/angular2';
import {OnActivate} from 'angular2/router';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Dispatcher} from 'app/services/services';

import {MembershipStore, MembershipState, MembershipStoreActions} from 'app/services/membership_service';


@Component({
	selector: 'membership-home'
})

@View({
	directives: [ angularDirectives, appDirectives ],
	templateUrl : './app/components/membership/home/home.html',
	styleUrls:['./app/components/membership/home/home.css']
})

export class MembershipHome implements OnActivate {
	_state: MembershipState;
	currentPrice: Number;
	
	constructor(public store: MembershipStore, public mbStoreActions: MembershipStoreActions){
		this._state = this.store.state;
		this.mbStoreActions.onUpdateState((state) => {
			this._state = state;
		})
	}
	
	onActivate() {
		this.mbStoreActions.update('actionBar.visible', false);
	}
	
	updateAdults(event) {
		this.mbStoreActions.update('membersCount.adults', event);
	}
	
	updateChildren(count) {
		this.mbStoreActions.update('membersCount.children', count);
	}
	
	updateRescuePlus(toggle){
		this.mbStoreActions.update('addons', toggle);
	}

}
