import {Component, View, OnDestroy} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {Router} from 'angular2/router';
import {MembershipStore, MembershipConsts, MembershipState} from 'app/services/services';

@Component({
	selector: 'userDetails-additional-user',
	viewBindings: [FormBuilder],
	bindings: []
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES ],
	templateUrl : './app/components/membership/user_details/panels/additional_user.html',
	styleUrls: ['./app/components/membership/user_details/panels/additional_user.css']
})

export class AdditionalUserPanel  implements OnDestroy{
	form: ControlGroup;
	dispatcher: Dispatcher;
	initialState: MembershipState;

	constructor(dispatcher: Dispatcher,fb: FormBuilder, public membershipStore: MembershipStore, public router: Router){
		this.dispatcher = dispatcher;
		this.initialState = membershipStore.get();
		
		this.form = fb.group({
			"email": [""]
		});
	}

	continue(){

		if (this.initialState.membersCount.children > 0) {
			this.router.navigate('/membership/user-details/child-user')
		}
		else {
			this.router.navigate('/membership/user-details/user-summary')
		}
	}

	onDestroy() {
		this.dispatcher.unsubscribe('form.radio', 'gender' + '.update');
	}

}