/// <reference path="../../../../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {ModalSlide} from 'app/directives/modal/modals.module';


@Component({
	selector: 'userDetails',
	viewBindings: [FormBuilder],
	bindings: [],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES, ModalSlide ],
	templateUrl : './app/components/membership/user_details/user_details.html',
	styleUrls: ['./app/components/membership/user_details/user_details.css']

})

export class MembershipUserDetails {
	additionalUsers: any;
	form: ControlGroup;
	dispatcher: any;

	constructor(dispatcher: Dispatcher,fb: FormBuilder){
		this.dispatcher = Dispatcher;
		this.additionalUsers = [];
		this.form = fb.group({
			"email": [""]
		});
		this.dispatcher.subscribe('form.radio', 'gender' + '.update', this.checkControls);
	}


	addAdditionalUser = () => {
		this.additionalUsers.push({'user':'user'})
	}
	checkControls = () => {
	}
	
	onDestroy() {
		this.dispatcher.unsubscribe('form.radio', 'gender' + '.update');
	}

}