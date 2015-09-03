import {Component, View, LifecycleEvent, NgIf} from 'angular2/angular2';
import {Injectable, Inject, bind} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';


export interface ActionBarItem {
	title: string;
	image: string;
	bkColor: string;
	intervalColor: string;
}


export var initActionBarState: ActionBarItem = {
	title: 'Title',
	image: '',
	bkColor: '',
	intervalColor: ''
}

@Component({
	selector: 'action-bar',
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/directives/nav/action_bar.html',
	styleUrls: ['app/directives/nav/action_bar.css'],
	directives: [NgIf]
})

export class ActionBar {
	state:  ActionBarItem;
	nextStateItem: ActionBarItem;
	actionBarVisible: boolean;

	constructor(
		public dispatcher: Dispatcher
		) {

			this.state = initActionBarState;
			this.dispatcher = dispatcher;
	}

	get = (): ActionBarItem => {
		return this.state
	}
		
	nextState = (_nextStateItem: ActionBarItem): void => {
		this.nextStateItem = _nextStateItem;
	}

	onDestroy(): void{
		this.dispatcher = null;
	}
}
