import {Component, View, ElementRef, OnInit} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";

import {Dispatcher} from 'app/services/services';
import {Router, OnActivate} from 'angular2/router';

import {appDirectives, angularDirectives} from 'app/directives/directives';

import {MembershipStore, MembershipConsts, MembershipState, MembershipForm, MembershipFormDefault} from 'app/services/services';


@Component({
	selector: 'user-details',
	viewBindings: [FormBuilder],
	bindings: [],
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES ],
	templateUrl : './app/components/membership/user_details/user_details.html',
	styleUrls: ['./app/components/membership/user_details/user_details.css']
})

export class MembershipUserDetails  implements OnInit, OnActivate{
	defaultUserForm: ControlGroup;	
	count: number;
	initialState: MembershipState;

	constructor(
		public router: Router,
		public dispatcher: Dispatcher,
		public membershipStore: MembershipStore,
		public fb: FormBuilder){
		
	}
	
	onActivate(){
		this.initialState = this.membershipStore.get();
	}
	
	onInit(){
		
		if (this.initialState.forms['defaultUser']) {
			this.defaultUserForm = this.initialState.forms['defaultUser'].form;
		}
		else {
			this.defaultUserForm = this.fb.group(new MembershipFormDefault());
		}
		
		this.defaultUserForm.valueChanges.observer({
			next: (value) => {
				this.initialState.forms['defaultUser']= _.extend({type: 'defaultUser', index: 0}, value)
				this.initialState.forms['defaultUser'].form = this.defaultUserForm;
				this.dispatcher.publish(MembershipConsts.STATE, MembershipConsts.UPDATESTATE, this.initialState)
			}
		})
		
	}
	
	continue() {
		if(this.initialState.membersCount.adults > 1) {
			this.router.navigate('/membership/user-details/additional-user')
		}
		else if (
			this.initialState.membersCount.adults < 2 &&
			this.initialState.membersCount.children > 0) 
		{
			this.router.navigate('/membership/user-details/child-user')
		}
		else {
			this.router.navigate('/membership/user-details/user-summary')
		}
	}
}