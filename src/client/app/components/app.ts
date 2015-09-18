import {Component, View} from 'angular2/angular2';
import {RouterOutlet, RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';

import {Dispatcher} from 'app/services/services';
import {Logger} from '../helpers/logger';
import {TopNav } from 'app/layout/topNav';
import {Membership} from 'app/components/membership/membership';
import {Tests} from 'app/components/test/tests';
import {appPipes} from 'app/pipes/pipes';


@Component({
	selector: 'app', // without [ ] means we are selecting the tag directly
	bindings: [Dispatcher]
})

@View({
	directives: [RouterOutlet, TopNav],
	templateUrl : './app/layout/shell.html',
	viewBindings: [ appPipes ]
})

@RouteConfig(
	[
		{path: '/',  redirectTo: '/membership/home'},
		{path: '/tests/...',  component: Tests, as: 'tests'},
		{path: '/membership/...',  component: Membership, as: 'membership'},
	])


export class App {

	constructor(public logger: Logger) {
		
	}
	
}