import {Component, View, OnDestroy} from 'angular2/angular2';
import {Dispatcher, MembershipStore, MembershipConsts, MembershipStoreActions} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {WhatsIncludedModal} from 'app/components/membership/modals/whats_included/m_whats_included';

@Component({
	selector: 'price-breakdown'
})

@View({
	templateUrl: 'app/components/membership/price_breakdown/price_breakdown.html',
	styleUrls: ['app/components/membership/price_breakdown/price_breakdown.css'],
	directives: [appDirectives, angularDirectives, WhatsIncludedModal]
})

export class MembershipPriceBreakdown implements OnDestroy {

	state: any;

	constructor(public dispatcher: Dispatcher, public store: MembershipStore, public actions: MembershipStoreActions) {
		this.activate();
	}

	activate() {
		this.state = this.store.get();
		this.actions.update('actionBar.priceEstimateVisible', true);

	}

	onOpenModal() {
		this.dispatcher.publish('whats_included', 'open.modal', true)
	}

	onUpdatedPaymentFrequency($event) {
		this.actions.update('paymentFrequency', $event.tabTitle == "One Payment" ? 'single' : 'monthly' );
	}

	onDestroy() {

	}
}