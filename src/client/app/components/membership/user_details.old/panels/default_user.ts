import {Component, View, OnDestroy} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher, MembershipConsts} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';



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

export class DefaultUserPanel  implements OnDestroy{
	defaultUserForm: ControlGroup;
	horizontalRef: any;
	formDetails:  {} = {};

	constructor(public dispatcher: Dispatcher,fb: FormBuilder){
		
		this.defaultUserForm = fb.group({
			"email": [''],
			"fname": ['']
		});
		
		this.activate();
		
		
		
		

	}
	
	activate() {
		this.formDetails = {
			
			
		}
		
		this.defaultUserForm.valueChanges.observer({
			next: (value) => {
				this.formDetails.form = value;
				this.formDetails.index = this.horizontalRef.index,
				this.dispatcher.publish(MembershipConsts.STATE, MembershipConsts.UPDATE, {
					prop: 'userDetails',
					value: this.formDetails
				})
			}
		})
		//this.dispatcher.subscribe('form.radio', 'gender' + '.update', this.checkControls);
	}

	checkControls = () => {
	}
	
	onChange() {
		// console.log('hi');
	}

	onDestroy() {
		//this.dispatcher.unsubscribe('form.radio', 'gender' + '.update');
	}

}