import {Component, View, OnDestroy} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'confirmation',
})

@View({
	templateUrl: 'app/components/membership/confirmation/confirmation.html',
	styleUrls: ['app/components/membership/confirmation/confirmation.css'],
	directives: [appDirectives]
})

export class MembershipConfirmation implements OnDestroy {

	constructor(public dispatcher: Dispatcher) {
		
	}

	onDestroy(){
		this.dispatcher = null;
	}
}