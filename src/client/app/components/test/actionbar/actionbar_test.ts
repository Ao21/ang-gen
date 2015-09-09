import {Component, View, Inject} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'actionbar-test',
	viewBindings: [Dispatcher]
})

@View({
	templateUrl: 'app/components/test/actionbar/actionbar_test.html',
	styleUrls: ['app/components/test/actionbar/actionbar_test.css'],
	directives: [appDirectives]
})


export class ActionBarTest {
	constructor(){
		//console.log('loaded')
	}
}