import {Component, View, NgFor, NgClass, EventEmitter, Attribute} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {Tab} from './form_tab';

@Component({
	selector: 'tabs',
	properties: ['selectedtab'],
	events: ['onSelectTab:onselecttab']
})

@View({
	templateUrl: 'app/directives/forms/tabs/form_tabs.html',
	styleUrls: ['app/directives/forms/tabs/form_tabs.css'],
	directives: [NgFor, NgClass]
})

export class Tabs {
	tabs: any;
	selected: Number;
	onSelectTab: EventEmitter;
	selectedTab: String;

	constructor(@Attribute('selectedtab') selectedtab) {
		this.tabs = [];
		this.selected = 0;
		this.selectedTab = selectedtab
		this.onSelectTab = new EventEmitter;
		
		
	}
	
	addTab(tab:Tab) {
		if(!this.selectedTab &&  this.tabs.length == 0 ) {
			console.log('selected')
			tab.active = true;
		}
		
		this.tabs.push(tab);
		
		if (this.selectedTab) {	
			this.tabs.forEach((element,i) => {
				if(element.tabValue == this.selectedTab) {
					element.active = true;
					this.selected = i;
				}
			});
		}
	}
	
	selectTab(tab, i) {
		this.tabs.forEach((tab) => {
		tab.active = false;
		});
		this.selected = i;
		tab.active = true;
		this.onSelectTab.next(tab);
	}	

}