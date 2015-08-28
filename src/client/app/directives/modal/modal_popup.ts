import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';



@Component({
	selector: 'modal-popup',
	properties: ['channel'],
	bindings: [
		Dispatcher
	]
})

@View({
	templateUrl: 'app/directives/modal/modal_popup.html',
	directives: [NgClass],
	styleUrls: ['app/directives/modal/modal_popup.css'],
})

export class ModalPopup {
	data: any;
	classMap: any;
	title: string;
	contents: any;
	
	constructor(
		@Attribute('channel') channel: string,
		public dispatcher: Dispatcher
		) {
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
}