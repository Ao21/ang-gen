import {Component, View, LifecycleEvent} from 'angular2/angular2';
import {Router} from 'angular2/router';
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
	timeout: any;
	
	constructor(public router: Router) {
		this.activate();
	}
	
	activate() {
		this.timeout = setTimeout(() => {
			this.router.navigate('/membership/price-breakdown')
		},2500)
	}

	onDestroy(){
		clearTimeout(this.timeout);
	}
}