/// <reference path="../../../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */

import {Component, View} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Validators} from 'angular2/forms';

import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'login',
	viewBindings: [FormBuilder]
})

@View({
	directives: [angularDirectives, appDirectives, FORM_DIRECTIVES],
	templateUrl: './app/components/membership/login/login.html'
})
export class MembershipLogin {
	form: ControlGroup;
	email: Control;
	visible: Boolean;

	constructor(fb: FormBuilder) {
		this.visible = false;
		this.form = fb.group({
			"email": ["", Validators.required],
			"password": [""]
		});

		this.email = this.form.controls['email'];
	}

	onSubmit(value: any): void {
		this.visible = true;
	}
	OnActivate(): void {
		console.log('loaded');
	}

}
