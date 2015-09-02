import {Component, View, Inject} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'checkbox-test',
	viewBindings: [Dispatcher]
})

@View({
	templateUrl: 'app/components/test/checkbox/checkbox_test.html',
	styleUrls: ['app/components/test/checkbox/checkbox_test.css'],
	directives: [appDirectives]
})


export class CheckboxTest {
}