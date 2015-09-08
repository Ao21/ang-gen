import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'confirmation',
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/components/membership/confirmation/confirmation.html',
	styleUrls: ['app/components/membership/confirmation/confirmation.css'],
	directives: [appDirectives]
})

export class MembershipConfirmation {

	constructor(public dispatcher: Dispatcher) {
		this.dispatcher = dispatcher;
		
	}

	onDestroy(){
		this.dispatcher = null;
	}
}