import {Attribute, Component, View, Host, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';

@Component({
	selector: 'addon-popup',
	properties: ['channel'],
	bindings: [
	],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/directives/addons_list/modals/addon_grid_popup.html',
	styleUrls: ['app/directives/addons_list/modals/addon_grid_popup.css'],

})

export class GridAddonPopup{
	name: string;
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

	};
	
	onDestroy() {
		this.dispatcher.unsubscribe(this.channel, 'open.modal');
		this.dispatcher = null;
	}
}