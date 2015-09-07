import {Attribute, Component, View, Host, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';

@Component({
	selector: 'estimate-modal',
	properties: ['channel'],
	bindings: [
	],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/directives/estimate_modal/estimate_modal.html',
	styleUrls: ['app/directives/estimate_modal/estimate_modal.css'],

})

export class EstimateModal{
	name: string;
	icon: string;
	details: string;
	channel: string;
	dispatcher: any;

	constructor(
		dispatcher: Dispatcher,
		@Attribute('channel') channel: string) {
			this.dispatcher = dispatcher;
		this.channel = channel
		this.dispatcher.subscribe(channel, 'open.modal', this.setModal);

	};
	setModal = (data: any, msg: any): void => {
		this.name = data.name;
		this.icon = data.icon;
		this.details = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec odio. Praesent libero. Sed cursus ante dapibus diam. Sed nisi. Nulla quis sem at nibh elementum imperdiet. Duis sagittis ipsum. Praesent mauris. Fusce nec tellus sed augue semper porta. Mauris massa. Vestibulum lacinia arcu eget nulla. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Curabitur sodales ligula in libero.'

	};
	
	onDestroy() {
		this.dispatcher.unsubscribe(this.channel, 'open.modal');
		this.dispatcher = null;
	}
}