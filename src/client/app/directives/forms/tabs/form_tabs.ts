import {Component, View, NgFor, NgClass, EventEmitter} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {Tab} from './form_tab';

@Component({
	selector: 'tabs',
	events: ['selectedTab:selectedtab']
})

@View({
	templateUrl: 'app/directives/forms/tabs/form_tabs.html',
	styleUrls: ['app/directives/forms/tabs/form_tabs.css'],
	directives: [NgFor, NgClass]
})

export class Tabs {
	tabs: any;
	selected: Number;
	selectedTab: EventEmitter;

	constructor() {
		this.tabs = [];
		this.selected = 0;
		this.selectedTab = new EventEmitter;
		
	}
	
	addTab(tab:Tab) {
		if(this.tabs.length == 0) {
			tab.active = true;
		}
		this.tabs.push(tab);
	}
	
	selectTab(tab, i) {
		this.tabs.forEach((tab) => {
		tab.active = false;
		});
		console.log(i)
		this.selected = i;
		tab.active = true;
		this.selectedTab.next(tab);
	}

}