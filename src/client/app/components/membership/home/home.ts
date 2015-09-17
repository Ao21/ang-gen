import {Component, View, Host, ChangeDetectionStrategy} from 'angular2/angular2';
import {OnActivate} from 'angular2/router';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Dispatcher} from 'app/services/services';

import {MembershipStore, MembershipState, MembershipConsts} from 'app/services/membership_service';


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
	_state: MembershipState;
	config: any;
	rescueMeChecked: boolean;
	
	constructor(public dispatcher: Dispatcher, public store: MembershipStore){
		this._state = this.store.state;
		this.activate();
	}
	
	activate() {
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATE, {
			prop: 'actionBar.visible',
			value: false
		});
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.ONUPDATESTATE, (state) => { this._state = state });
	}
	
	updateAdults(count) {
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, {membersCount: {adults:count}});
	}
	
	updateChildren(count) {
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, {membersCount: {children:count}});
	}
	
	updateRescuePlus(toggle){
		this.dispatcher.publish(MembershipConsts.STATE,MembershipConsts.UPDATESTATE, {addons:toggle});
	}
	onDestroy(){
		this.dispatcher = null;
	}
}
