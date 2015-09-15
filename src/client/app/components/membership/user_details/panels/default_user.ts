import {Component, View, OnDestroy} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {Router, OnActivate} from 'angular2/router';
import {MembershipStore, MembershipConsts, MembershipState, MembershipForm, MembershipFormDefault} from 'app/services/services';

@Component({
	selector: 'userDetails-defaultUser',
	viewBindings: [FormBuilder],
	bindings: [],
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES ],
	templateUrl : './app/components/membership/user_details/panels/default_user.html',
	styleUrls: ['./app/components/membership/user_details/panels/default_user.css']
})

export class DefaultUserPanel  implements OnActivate{
	defaultUserForm: ControlGroup;	
	count: number;
	initialState: MembershipState;

	constructor(
		public router: Router,
		public dispatcher: Dispatcher,
		public membershipStore: MembershipStore,
		public fb: FormBuilder){
			this.initialState = this.membershipStore.get();
		
	}
	
	onActivate(){
		
	}
	
	onInit(){
		this.defaultUserForm = this.initialState.forms['defaultUser'].form;
	}


	onDestroy() {
		//this.dispatcher.unsubscribe('form.radio', 'gender' + '.update');
	}

}