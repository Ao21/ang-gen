import {Component, View, Host} from 'angular2/angular2';
import {OnActivate} from 'angular2/router';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Dispatcher} from 'app/services/services';

import {MembershipStore, MembershipState} from 'app/services/membership.service';


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
	rescueMeChecked: boolean;
	
	constructor(public dispatcher: Dispatcher, public store: MembershipStore){
		this.activate();
	}
	
	activate() {
		this.state = this.store.get();
		this.dispatcher.publish('Membership','actionBar.hide', null);
		this.dispatcher.subscribe('Membership.state','is-updated.state', (state) => { this.state = state });
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
		var _state  = {addons:toggle};
		this.dispatcher.publish('Membership.state','update.state', _state);
	}
	onDestroy(){
		this.dispatcher = null;
	}
}
