import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'testimonials',
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/components/membership/testimonials/testimonials.html',
	styleUrls: ['app/components/membership/testimonials/testimonials.css'],
})

export class MembershipTestimonials {

	constructor(public dispatcher: Dispatcher) {
		this.dispatcher = dispatcher;
		
	}

	onDestroy(){
		this.dispatcher = null;
	}
}