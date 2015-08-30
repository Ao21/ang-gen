import {Component, View, Inject} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox-test',
	viewBindings: [Dispatcher]
})

@View({
	templateUrl: 'app/components/test/checkbox.html',
	directives: []
})

@Inject(Dispatcher)
export class CheckboxTest {
	constructor(public dispatcher: Dispatcher)
		{
			
		}
}