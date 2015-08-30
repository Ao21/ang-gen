import {Component, View, NgIf, Host} from 'angular2/angular2';

import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Tabs} from './form_tabs';

@Component({
	selector: 'tab',
	properties: ['tabTitle: tab-title']
})

@View({
	templateUrl: 'app/directives/forms/tabs/form_tab.html',
	styleUrls: ['app/directives/forms/tabs/form_tab.css'],
	directives: [NgIf]
})

export class Tab{
	active: Boolean;
	constructor(@Host tabs : Tabs) {
		tabs.addTab(this);
	}

}