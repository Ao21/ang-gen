import {Component, View, Host, ChangeDetectionStrategy} from 'angular2/angular2';
import {OnActivate} from 'angular2/router';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Dispatcher} from 'app/services/services';

import {MembershipStore, MembershipState, MembershipConsts} from 'app/services/membership.service';


@Component({
	selector: 'membership-home',
	changeDetection: ChangeDetectionStrategy.OnPush
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
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATE, {
			prop: 'actionBar.visible',
			value: false
		});
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.ONUPDATESTATE, (state) => { this.state = state });
	}
	
	updateAdults(count) {
		var _state = {membersCount: {adults:count}};
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, _state);
	}
	
	updateChildren(count) {
		var _state = {membersCount: {children:count}};
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, _state);
	}
	
	updateRescuePlus(toggle){
		var _state  = {addons:toggle};
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, _state);
	}
	onDestroy(){
		this.dispatcher = null;
	}
}
