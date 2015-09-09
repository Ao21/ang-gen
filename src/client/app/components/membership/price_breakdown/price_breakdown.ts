import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
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

	constructor(public dispatcher: Dispatcher) {
		this.dispatcher = dispatcher;
		this.dispatcher.publish('Membership','actionBar.togglePriceEstimateIcon', true)
	}
	
	onUpdatedPaymentFrequency() {
		//console.log('updated frequency!')
	}

	onDestroy(){
		this.dispatcher = null;
	}
}