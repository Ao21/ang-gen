import {Component, View, Host} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Dispatcher} from 'app/services/services';

import {MembershipStore, MembershipState, MembershipService} from 'app/services/membership.service';


@Component({
	selector: 'membership-home',
	changeDetection: 'ONPUSH'
})

@View({
	directives: [ angularDirectives, appDirectives ],
	templateUrl : './app/components/membership/home/home.html',
	styleUrls:['./app/components/membership/home/home.css']
})

export class MembershipHome {
	state: MembershipState;
	config: any;
	
	constructor(public dispatcher: Dispatcher, public store: MembershipStore, @Host() membershipService: MembershipService){
		this.dispatcher = dispatcher;
		this.state = this.store.get();
		this.config = membershipService.get();
		
		this.dispatcher.publish('Membership','actionBar.hide', null);
		
		this.state.priceEstimate = this.config.defaultPrices.membership; 
	}
	
	updateAdults(count) {
		var _state = {membersCount: {adults:count}};
		this.dispatcher.publish('Membership.state','update.state', _state);
	}
	
	updateChildren(count) {
		var _state = {membersCount: {children:count}};
		this.dispatcher.publish('Membership.state','update.state', _state);
	}
	
	updateRescuePlus(toggle){
		var _state  = {priceEstimate : toggle ? this.config.defaultPrices.membership + this.config.defaultPrices.rescueme : this.config.defaultPrices.membership};
		_state['addons'] = true;
		this.dispatcher.publish('Membership.state','update.state', _state);
	}
	onDestroy(){
		this.dispatcher = null;
	}
}
