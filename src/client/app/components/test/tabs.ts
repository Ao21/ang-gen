import {Component, View, Inject} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {Tabs} from 'app/directives/forms/tabs/form_tabs';
import {Tab} from 'app/directives/forms/tabs/form_tab';

@Component({
	selector: 'checkbox-test',
	viewBindings: [Dispatcher]
})

@View({
	templateUrl: 'app/components/test/tabs.html',
	directives: [Tabs, Tab]
})

@Inject(Dispatcher)
export class TabsTest {
	constructor(public dispatcher: Dispatcher)
	{
			
	}
}