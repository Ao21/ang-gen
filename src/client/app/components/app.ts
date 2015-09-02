import {Component, View} from 'angular2/angular2';
import {RouterOutlet, RouteConfig, RouterLink} from 'angular2/router';
import {Dispatcher} from 'app/services/services';
import {Logger} from '../helpers/logger';
import {TopNav } from 'app/layout/topNav';
import {Membership, MembershipLogin, MembershipAddons, MembershipUserDetails, MembershipPriceBreakdown} from 'app/components/membership/modules';
import {TabsTest} from 'app/components/test/tabs';
import {appPipes} from 'app/pipes/pipes';


@Component({
	selector: 'app', // without [ ] means we are selecting the tag directly
	bindings: [Dispatcher]
})

@View({
	directives: [RouterOutlet, RouterLink, TopNav],
	templateUrl : './app/layout/shell.html',
	viewBindings: [ appPipes ]
})


@RouteConfig(
	[
		{path: '/',  redirectTo: '/membership'},
		{path: '/test',  component: TabsTest},
		{path: '/membership',  component: Membership},
		{path: '/membership/login', as: 'membership-login', component: MembershipLogin},
		{path: '/membership/addons', as: 'membership-addons', component: MembershipAddons},
		{path: '/membership/user-details', as: 'membership-user-details', component: MembershipUserDetails},
		{path: '/membership/price-breakdown', as: 'membership-price-breakdown', component: MembershipPriceBreakdown}
	])


export class App {

	votes: number;

	constructor(public logger: Logger) {
		this.votes = 10;
	}
	voteUp(): void {
	}
}