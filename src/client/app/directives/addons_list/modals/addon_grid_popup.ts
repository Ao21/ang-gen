import {Attribute, Component, View, Host, OnDestroy} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';

@Component({
	selector: 'addon-popup',
	properties: ['channel'],
	bindings: [
	]
})

@View({
	templateUrl: 'app/directives/addons_list/modals/addon_grid_popup.html',
	styleUrls: ['app/directives/addons_list/modals/addon_grid_popup.css'],

})

export class GridAddonPopup implements OnDestroy{
	name: string;
	icon: string;
	details: string;


	constructor(public dispatcher: Dispatcher, @Attribute('channel') public channel: string) {
		this.activate();
	};
	
	activate() {
		this.dispatcher.subscribe(this.channel, 'open.modal', this.setModal);
	}
	
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