import {Component, View} from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';
import {Dispatcher} from 'app/services/services';
@Component({
	selector: 'membership-home'
})

@View({
	directives: [ angularDirectives, appDirectives ],
	templateUrl : './app/components/membership/home/home.html',
	styleUrls:['./app/components/membership/home/home.css']
})

export class MembershipHome {
	constructor(public dispatcher: Dispatcher){
		this.dispatcher = dispatcher;
		this.dispatcher.publish('Membership','actionBar.hide', null);

	}
	onDestroy(){
		this.dispatcher = null;
	}
}
