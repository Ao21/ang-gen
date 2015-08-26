import {Attribute, Component, View, Host} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';

@Component({
	selector: 'addon-popup',
	properties: ['channel'],
	bindings: [
		Dispatcher
	
	]
})

@View({
	templateUrl: 'app/directives/addons_list/modals/addon_grid_popup.html',
	styleUrls: ['app/directives/addons_list/modals/addon_grid_popup.css'],

})

export class GridAddonPopup{
	name: string;

	constructor(
		public dispatcher: Dispatcher,
		@Attribute('channel') channel: string) {
		console.log('popup', this);
		this.dispatcher.subscribe(channel, 'open.modal', this.setModal);

	};
	setModal = (data: any, msg: any): void => {
		this.name = data.name;

	};
}