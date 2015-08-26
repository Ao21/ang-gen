/// <reference path="../../../../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'userDetails',
	viewBindings: [FormBuilder],
	bindings: [Dispatcher]
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES ],
	templateUrl : './app/components/membership/user_details/user_details.html',
	styleUrls: ['./app/components/membership/user_details/user_details.css']

})

export class MembershipUserDetails {
	form: ControlGroup;
	constructor(
		public dispatcher: Dispatcher,
		fb: FormBuilder
	){
		this.form = fb.group({
			"email": [""],
		});
		this.dispatcher.subscribe('form.radio', 'gender' + '.update', this.checkControls);
	}
	
	checkControls = () => {
		
		console.log(this);
	} 
}