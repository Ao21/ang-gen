import {Attribute, Component, View, Host, OnDestroy} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';

@Component({
	selector: 'estimate-modal',
	properties: ['channel'],
	bindings: [
	]
})

@View({
	templateUrl: 'app/components/membership/modals/estimate_modal/m_estimate_modal.html',
	styleUrls: ['app/components/membership/modals/estimate_modal/m_estimate_modal.css'],

})

export class EstimateModal implements OnDestroy{
	name: string;
	icon: string;
	details: string;
	channel: string;

	constructor(public dispatcher: Dispatcher, @Attribute('channel') channel: string) {
		this.channel = channel
		this.activate();
	};
	
	activate() {
		
	}
	
	
	onDestroy() {
		this.dispatcher.unsubscribe(this.channel, 'open.modal');
		this.dispatcher = null;
	}
}
