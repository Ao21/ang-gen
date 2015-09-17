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
	state: MembershipState;


	constructor(
		public router: Router,
		public dispatcher: Dispatcher,
		public membershipStore: MembershipStore,
		public fb: FormBuilder){
		
	}
	
	onActivate(){
		this.state = this.membershipStore.get();
	}
	
	onInit(){
		
		if (this.state.forms['defaultUser']) {
			this.defaultUserForm = this.fb.group(this.state.forms.defaultUser); 
		}
		else {
			this.defaultUserForm = this.fb.group(new MembershipFormDefault());
		}
		
		this.defaultUserForm.valueChanges.observer({
			next: (value) => {
				this.dispatcher.publish(MembershipConsts.STATE, MembershipConsts.UPDATE, {
					prop: 'forms.defaultUser',
					value: value
				})
				
			}
		})
		
	}
	continue() {
		if(this.state.membersCount.adults > 1) {
			this.router.navigate('/membership/user-details/additional-user')
		}
		else if (
			this.state.membersCount.adults < 2 &&
			this.state.membersCount.children > 0) 
		{
			this.router.navigate('/membership/user-details/child-user')
		}
		else {
			this.router.navigate('/membership/user-details/user-summary')
		}
	}
}