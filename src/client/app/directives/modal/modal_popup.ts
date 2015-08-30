import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass, LifecycleEvent} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';



@Component({
	selector: 'modal-popup',
	properties: ['channel'],
	bindings: [

	],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/directives/modal/modal_popup.html',
	directives: [NgClass],
	styleUrls: ['app/directives/modal/modal_popup.css'],
})

export class ModalPopup {
	data: any;
	dispatcher: any;
	channel: string;
	classMap: any;
	title: string;
	contents: any;

	constructor(
		@Attribute('channel') channel: string,
		dispatcher: Dispatcher
		) {
		this.dispatcher = dispatcher;
		this.channel = channel;
    	this.dispatcher.subscribe(channel,'open.modal', this.openModal);
    	this.dispatcher.subscribe(channel,'close.modal', this.closeModal);
		this.classMap = { 'md-show': false };
	};
	openModal = (data:any, msg: any): void => {
		this.title = data.name;
		this.classMap['md-show'] = true;
	};
	closeModal = (): void => {
		this.classMap['md-show'] = false;
	};
	close = (): void =>  {
		this.dispatcher.publish('addons','close.modal', null)
	}
	onDestroy() {
		this.dispatcher.unsubscribe(this.channel,'open.modal');
		this.dispatcher.unsubscribe(this.channel,'close.modal');
		this.dispatcher = null;
	}
}