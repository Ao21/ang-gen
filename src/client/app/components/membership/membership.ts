import {Component, View, EventEmitter, Inject} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet} from 'angular2/router';
import {NgIf} from 'angular2/angular2'
import {Dispatcher, MembershipStore, MembershipConsts} from 'app/services/services';
import {EstimateModal} from './modals/estimate_modal/m_estimate_modal';

import {DefaultUserPanel} from 'app/components/membership/user_details/panels/default_user';

import {
	MembershipHome,
	MembershipLogin, 
	MembershipAddons, 
	MembershipPriceBreakdown, 
	MembershipPaymentOptions,  
	MembershipUserDetails, 
	MembershipTestimonials,
	MembershipConfirmation,
	
	AdditionalUserPanel,
	ChildUserPanel,
	SummaryUserPanel
	} from 'app/components/membership/modules';
	
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'membership',
	bindings: []
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
	{path: '/confirmation', as: 'confirmation', component: MembershipConfirmation},
	
	{path: '/user-details/def-user', as: 'def-user', component: DefaultUserPanel},
	{path: '/user-details/additional-user', as: 'additional-user', component: AdditionalUserPanel},
	{path: '/user-details/child-user', as: 'child-user', component: ChildUserPanel},
	{path: '/user-details/user-summary', as: 'user-summary', component: SummaryUserPanel}
])



@View({
	directives: [ROUTER_DIRECTIVES, angularDirectives, appDirectives, RouterOutlet, NgIf, EstimateModal],
	templateUrl : './app/components/membership/membership.html',
	styleUrls:['./app/components/membership/membership.css']
})


export class Membership {
	state: any;
	
	constructor(public dispatcher: Dispatcher, public store: MembershipStore) {
		this.state = this.store.get();
		this.activate();
	}
	
	activate() {
		this.dispatcher.subscribe(
			MembershipConsts.STATE, 
			MembershipConsts.ONUPDATESTATE, 
			(state) => 
				{ this.state = state }
		);
	}
}
