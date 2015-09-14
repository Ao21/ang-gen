import {Component, View, OnDestroy, NgIf, NgFor, NgClass, EventEmitter, Host} from 'angular2/angular2';
import {Injectable, Inject, bind} from 'angular2/angular2';
import {MembershipStore, MembershipState, MembershipConsts} from 'app/services/membership.service';
import {Dispatcher} from 'app/services/services';
import {Router, Location} from 'angular2/router';

@Component({
	selector: 'action-bar',
	events: ['toggleOpenPriceEstimate : toggleopenpriceestimate'],
	properties:['priceEstimateIsVisible']
})

@View({
	templateUrl: 'app/directives/nav/action_bar.html',
	styleUrls: ['app/directives/nav/action_bar.css'],
	directives: [NgIf, NgFor, NgClass]
})

@Injectable()
export class ActionBar implements OnDestroy {
	toggleOpenPriceEstimate: EventEmitter;
	state: MembershipState;

	constructor(
		public dispatcher: Dispatcher,
		public router: Router,
		public location: Location,
		public store: MembershipStore
		) {
			this.toggleOpenPriceEstimate = new EventEmitter;
			this.state = store.get();
			this.activate();
	}
	
	activate() {
		this.dispatcher.subscribe(MembershipConsts.STATE,MembershipConsts.ONUPDATESTATE, (_state) => 
		{
			this.state = _state
		})
	}
	
	navigateBack(){
		this.location.back();
	}
	
	togglePriceEstimate() {
		//Local Event Emitter
		//this.toggleOpenPriceEstimate.next('toggle');
		this.dispatcher.publish('Membership.Estimate','toggle.modal',null);
	}
		
	onDestroy(): void{
		this.dispatcher = null;
	}
}

// export our injectables for this module
export var actionBarInjectables: Array<any> = [
  	bind(ActionBar).toClass(ActionBar)
];