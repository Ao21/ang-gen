import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet} from 'angular2/router';
import {
	MembershipHome,
	MembershipLogin, 
	MembershipAddons, 
	MembershipPriceBreakdown, 
	MembershipPaymentOptions,  
	MembershipUserDetails, 
	MembershipTestimonials,
	MembershipConfirmation} from 'app/components/membership/modules';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'membership'
})

@RouteConfig([
	{ path: '/', redirectTo: '/home' },
	{path: '/home', as: 'home', component: MembershipHome},
	{path: '/login', as: 'login', component: MembershipLogin},
	{path: '/addons', as: 'addons', component: MembershipAddons},
	{path: '/price-breakdown', as: 'price-breakdown', component: MembershipPriceBreakdown},
	{path: '/payment-options', as: 'payment-options', component:MembershipPaymentOptions},
	{path: '/user-details', as: 'user-details', component: MembershipUserDetails},
	{path: '/testimonials', as: 'testimonials', component: MembershipTestimonials},
	{path: '/confirmation', as: 'confirmation', component: MembershipConfirmation}
])



@View({
	directives: [ROUTER_DIRECTIVES, angularDirectives, appDirectives, RouterOutlet],
	templateUrl : './app/components/membership/membership.html',
	styleUrls:['./app/components/membership/membership.css']
})


export class Membership {
}
