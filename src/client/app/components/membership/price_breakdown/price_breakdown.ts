import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher, MembershipStore} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'price-breakdown'
})

@View({
	templateUrl: 'app/components/membership/price_breakdown/price_breakdown.html',
	styleUrls: ['app/components/membership/price_breakdown/price_breakdown.css'],
	directives: [appDirectives, angularDirectives]
})

export class MembershipPriceBreakdown {
	
	state: any;
	
	constructor(public dispatcher: Dispatcher, public store: MembershipStore) {
		this.activate();
	}
	
	activate() {
		this.state = this.store.get();
		this.dispatcher.publish('Membership.state','update', {
			prop: 'actionBar.priceEstimateVisible',
			value: true
		});
		
	}
	
	onUpdatedPaymentFrequency($event) {
		var _state = {};
		_state['paymentFrequency'] = $event.tabTitle== "One Payment" ? 'single' : 'monthly';
		this.dispatcher.publish('Membership.state','update.state', _state);
		

	}

	onDestroy(){
		this.dispatcher = null;
	}
}