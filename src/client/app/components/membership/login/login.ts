/// <reference path="../../../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */

import {Component, View} from 'angular2/angular2';
import {FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Validators} from 'angular2/angular2';

import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'login',
	viewInjector: [FormBuilder]
})

@View({
	directives: [angularDirectives, appDirectives],
	templateUrl: './app/components/membership/login/login.html'
})

export class MembershipLogin {
	myForm: ControlGroup;
	email: Control;
	visible: Boolean;

	constructor(fb: FormBuilder) {
		this.visible = false;
		this.myForm = fb.group({
			"email": [""],
			"password": [""]
		});

		this.email = this.myForm.controls['email'];
	}

	onSubmit(value: any): void {
		this.visible = true;
	}
	OnActivate(): void {
		console.log('loaded');
	}

}
