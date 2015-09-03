import {Component, View} from 'angular2/angular2';
import {RouteConfig, ROUTER_DIRECTIVES, RouterOutlet} from 'angular2/router';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {appPipes} from 'app/pipes/pipes';

import {TestsHome} from './home/home';
import {CheckboxTest} from './checkbox/checkbox_test';
import {TabsTest} from './tabs/tabs_test';
import {IncrementorTest} from './incrementor/incrementor_test';
import {HorizontalScrollTest} from './scroller/horizontalScroll_test'
import {ActionBarTest} from './actionbar/actionbar_test';
 
@Component({
	selector: 'tests'
})

@RouteConfig([
	{ path: '/', redirectTo: '/home' },
	{ path: '/home', as: 'home', component: TestsHome },
	{ path: '/checkbox', as: 'checkbox', component: CheckboxTest},
	{ path: '/tabs', as: 'tabs', component: TabsTest},
	{ path: '/incrementor', as: 'incrementor', component: IncrementorTest},
	{ path: '/scroller', as: 'scroller', component: HorizontalScrollTest},
	{ path: '/actionbar', as: 'actionbar', component: ActionBarTest}	
])


@View({
	directives: [RouterOutlet],
	templateUrl : 'app/components/test/tests.html',
	viewBindings: [ appPipes ]
})


export class Tests {
}