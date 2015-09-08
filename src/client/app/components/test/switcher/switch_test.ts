import {Component, View, Inject} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'switch-test'

})

@View({
	templateUrl: 'app/components/test/switcher/switch_test.html',
	directives: [appDirectives]
})


export class SwitchTest {
	
}