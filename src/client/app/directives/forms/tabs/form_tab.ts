import {Component, View, NgIf, Host, Attribute} from 'angular2/angular2';

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

export class Tab{
	active: Boolean;
	tabValue = String;
	constructor(@Host tabs : Tabs, @Attribute('tab-value') tabValue) {
		this.tabValue = tabValue;
		tabs.addTab(this);
	}

}