import {Component, View, OnDestroy} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';



@Component({
	selector: 'userDetails-child-user',
	viewBindings: [FormBuilder],
	bindings: [],

})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES ],
	templateUrl : './app/components/membership/user_details/panels/child_user.html',
	styleUrls: ['./app/components/membership/user_details/panels/child_user.css']
})

export class ChildUserPanel  implements OnDestroy{
	form: ControlGroup;
	dispatcher: Dispatcher;

	constructor(dispatcher: Dispatcher,fb: FormBuilder){
		this.dispatcher = dispatcher;
		
	}
	onDestroy() {
	}

}