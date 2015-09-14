import {Component, SkipSelf, View, ViewQuery, OnInit, TemplateRef, QueryList, NgIf, Host, Attribute} from 'angular2/angular2';


import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Tabs} from './form_tabs';

@Component({
	selector: 'tab',
	properties: ['tabTitle: tab-title','tabValue: tab-value']
})

@View({
	templateUrl: 'app/directives/forms/tabs/form_tab.html',
	styleUrls: ['app/directives/forms/tabs/form_tab.css'],
	directives: [NgIf]
})

export class Tab implements OnInit{
	active: Boolean;
	tabValue = String;
	labelTemplate: String;
	bodyTemplate: String;
	
	
	
	constructor(
		@Host tabs: Tabs,
		@Attribute('tab-value') tabValue,
	 	@Attribute('label') labelAttribute,
    	@ViewQuery(TemplateRef) public templates:QueryList<TemplateRef>
	) {
		
		this.tabValue = tabValue;
		tabs.addTab(this);
	}
	
	onInit() {
		this.labelTemplate = this.templates._results[0];
    	this.bodyTemplate = this.templates._results[1];

		
	}

}