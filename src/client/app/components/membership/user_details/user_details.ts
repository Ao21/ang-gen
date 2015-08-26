/// <reference path="../../../../../../typings/tsd.d.ts" />

import {Component, View} from 'angular2/angular2';
import {FormBuilder} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'userDetails',
	viewInjector: [FormBuilder]
})

@View({
	directives: [ angularDirectives, appDirectives ],
	templateUrl : './app/components/membership/user_details/user_details.html',
	styleUrls: ['./app/components/membership/user_details/user_details.css']

})

export class MembershipUserDetails {
}