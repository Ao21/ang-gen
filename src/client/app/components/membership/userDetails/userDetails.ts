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
	templateUrl : './app/components/membership/userDetails/userDetails.html',
	styleUrls: ['./app/components/membership/userDetails/userDetails.css']

})

export class MembershipUserDetails {
}