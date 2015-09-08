import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';



@Component({
	selector: 'userDetails-additional-user',
	viewBindings: [FormBuilder],
	bindings: [],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES ],
	templateUrl : './app/components/membership/user_details/panels/additional_user.html',
	styleUrls: ['./app/components/membership/user_details/panels/additional_user.css']
})

export class AdditionalUserPanel {
	form: ControlGroup;
	dispatcher: Dispatcher;

	constructor(dispatcher: Dispatcher,fb: FormBuilder){
		this.dispatcher = dispatcher;
		
		
		this.form = fb.group({
			"email": [""]
		});
		this.dispatcher.subscribe('form.radio', 'gender' + '.update', this.checkControls);
	}

	checkControls = () => {
	}

	onDestroy() {
		this.dispatcher.unsubscribe('form.radio', 'gender' + '.update');
	}

}