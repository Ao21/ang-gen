/// <reference path="../../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Component, View} from 'angular2/angular2';
import {RouterOutlet, RouteConfig, RouterLink} from 'angular2/router';

import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'membership'
})

@View({
	directives: [ angularDirectives, appDirectives ],
	templateUrl : './app/components/membership/membership.html'
})

export class Membership {
}
