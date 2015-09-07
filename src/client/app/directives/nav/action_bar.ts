import {Component, View, LifecycleEvent, NgIf, NgFor, NgClass, EventEmitter} from 'angular2/angular2';
import {Injectable, Inject, bind} from 'angular2/angular2';
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

export var initState = {title: 'Title',image: '',bkColor: '',intervalColor: ''}

@Component({
	selector: 'action-bar',
	lifecycle: [LifecycleEvent.onDestroy],
	events: ['toggleOpenPriceEstimate : toggleopenpriceestimate']
})

@View({
	templateUrl: 'app/directives/nav/action_bar.html',
	styleUrls: ['app/directives/nav/action_bar.css'],
	directives: [NgIf, NgFor, NgClass]
})

@Injectable()
export class ActionBar {
	state: ActionBarItem;
	router: Router;
	location: Location;
	nextStateItem: ActionBarItem;
	toggleOpenPriceEstimate: EventEmitter;


	constructor(
		public dispatcher: Dispatcher,
		router: Router,
		location: Location
		) {
			this.toggleOpenPriceEstimate = new EventEmitter;
			
			this.dispatcher = dispatcher;
			this.router = router;
			this.location = location;
			this.state = initState;
			
			dispatcher.subscribe('Membership','actionBar.update', this.updateState)
			
	}
	
	
	updateState= (title) =>{
		// TODO: Connect this to a real store
		initState=  {title: title, image: '',bkColor: '',intervalColor: ''}
		
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