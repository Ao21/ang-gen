import {Component, View, Inject} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {FormIncrementor} from 'app/directives/forms/incrementor/form_incrementor';

@Component({
	selector: 'incrementorTest',
	viewBindings: [Dispatcher]
})

@View({
	templateUrl: 'app/components/test/incrementor.html',
	directives: [FormIncrementor]
})

@Inject(Dispatcher)
export class IncrementorTest {

	constructor(public dispatcher: Dispatcher)
		{
			
		}
}