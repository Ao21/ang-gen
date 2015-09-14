import {Component, View, NgFor, NgClass, Query, OnInit, EventEmitter, Attribute, QueryList, forwardRef, ViewQuery} from 'angular2/angular2';
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

export class Tabs implements OnInit {
	selected: Number;
	onSelectTab: EventEmitter;
	selectedTab: String;
	protected tabs: QueryList<Tab>;
	
	
	constructor(@Attribute('selectedtab') selectedtab,  
	 @Query(Tab) items :QueryList<Tab>
	 ) {
		this.tabs = [];
		this.selected = 0;
		this.selectedTab = selectedtab
		this.onSelectTab = new EventEmitter;
	}
	
	onInit(){
		this.tabs[0].active = true;
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