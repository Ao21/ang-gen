import {Component, View, Inject} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
	selector: 'checkbox-test',
	viewBindings: [Dispatcher]
})

@View({
	templateUrl: 'app/components/test/tabs/tabs_test.html',
	directives: [appDirectives]
})

@Inject(Dispatcher)
export class TabsTest {
	constructor(public dispatcher: Dispatcher)
	{
			
	}
}