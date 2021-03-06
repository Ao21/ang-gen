import {Component, View, OnDestroy  } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'payment-options'
})

@View({
	templateUrl: 'app/components/membership/payment_options/payment_options.html',
	styleUrls: ['app/components/membership/payment_options/payment_options.css'],
	directives: [appDirectives, angularDirectives]
})

export class MembershipPaymentOptions implements OnDestroy  {

	constructor(public dispatcher: Dispatcher) {
	}

	onDestroy(){
		this.dispatcher = null;
	}
}