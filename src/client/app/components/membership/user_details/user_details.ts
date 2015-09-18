import {Component, View, ElementRef, OnInit} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";

import {Dispatcher} from 'app/services/services';
import {Router, OnActivate} from 'angular2/router';

import {appDirectives, angularDirectives} from 'app/directives/directives';

import {MembershipStore, MembershipConsts, MembershipState, MembershipForm, MembershipFormDefault, MembershipStoreActions} from 'app/services/services';


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
	_state: MembershipState;

	constructor(
		public router: Router,
		public membershipStore: MembershipStore,
		public mbStoreActions: MembershipStoreActions,
		public fb: FormBuilder){
		
	}
	
	onActivate(){
		this._state = this.membershipStore.get();
	}
	
	onInit(){
		
		let formControls = this._state.forms['defaultUser'] ? this._state.forms.defaultUser : new MembershipFormDefault();
		
		this.defaultUserForm = this.fb.group(formControls);
		
		this.defaultUserForm.valueChanges.observer({
			next: (value) => {
				this.mbStoreActions.update('forms.defaultUser', value);
			}
		})
	}
	
	continue() {
		if(this._state.membersCount.adults > 1) {
			this.router.navigate('/membership/user-details/additional-user')
		}
		else if (
			this._state.membersCount.adults < 2 &&
			this._state.membersCount.children > 0) 
		{
			this.router.navigate('/membership/user-details/child-user')
		}
		else {
			this.router.navigate('/membership/user-details/user-summary')
		}
	}
}