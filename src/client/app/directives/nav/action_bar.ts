import {Component, View, LifecycleEvent, NgIf, NgFor, NgClass, EventEmitter, Host} from 'angular2/angular2';
import {Injectable, Inject, bind} from 'angular2/angular2';
import {MembershipStore, MembershipState} from 'app/services/membership.service';
import {Dispatcher} from 'app/services/services';
import {Router, Location} from 'angular2/router';


export interface ActionBarItem {
	title: string;
	image: string;
	bkColor: string;
	intervalColor: string;
}



interface ActionBarState {
	states: Array<ActionBarItem>
}

export var initActionBarState: ActionBarState = {
	states: [
		{title: 'Title',image: '',bkColor: '',intervalColor: ''},
		{title: 'Title2',image: '',bkColor: '',intervalColor: ''},
		{title: 'Title3',image: '',bkColor: '',intervalColor: ''}
	]
}

export var initState = {title: '',image: '',bkColor: '',intervalColor: ''}
export var priceEstimateIsVisible = false;

@Component({
	selector: 'action-bar',
	lifecycle: [LifecycleEvent.onDestroy],
	events: ['toggleOpenPriceEstimate : toggleopenpriceestimate'],
	properties:['priceEstimateIsVisible']
})

@View({
	templateUrl: 'app/directives/nav/action_bar.html',
	styleUrls: ['app/directives/nav/action_bar.css'],
	directives: [NgIf, NgFor, NgClass]
})

@Injectable()
export class ActionBar {
	state: ActionBarItem;
	nextStateItem: ActionBarItem;
	toggleOpenPriceEstimate: EventEmitter;
	priceEstimateIsVisible: boolean;
	mState: MembershipState;
	


	constructor(
		public dispatcher: Dispatcher,
		public router: Router,
		public location: Location,
		public store: MembershipStore
		) {
			this.toggleOpenPriceEstimate = new EventEmitter;
			this.state = initState;
			
			this.priceEstimateIsVisible = priceEstimateIsVisible;
			this.mState = store.get();
			
			dispatcher.subscribe('Membership','actionBar.update', this.updateState)
			dispatcher.subscribe('Membership','actionBar.togglePriceEstimateIcon', this.togglePriceEstimateIcon)
			
	}
	
	
	updateState= (title) =>{
		// TODO: Connect this to a real store
		initState.title = title;
	}
	
	togglePriceEstimateIcon = (toggle) => {
		//hack
		priceEstimateIsVisible = toggle ? toggle : !priceEstimateIsVisible;
		this.priceEstimateIsVisible  = priceEstimateIsVisible;
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
		//this.dispatcher = null;
	}
}


// export our injectables for this module
export var actionBarInjectables: Array<any> = [
  	bind(ActionBar).toClass(ActionBar)
];