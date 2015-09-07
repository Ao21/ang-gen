import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass, LifecycleEvent } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';



@Component({
	selector: 'modal-slide',
	properties: ['channel', 'classMap'],
	bindings: [
		
	],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	templateUrl: 'app/directives/modal/modal_slide.html',
	directives: [NgClass],
	styleUrls: ['app/directives/modal/modal_slide.css'],

})

export class ModalSlide {
	data: any;
	dispatcher: any;
	channel: string;
	classMap: any;
	title: string;
	contents: any;

	constructor(
		@Attribute('channel') channel: string,
		@Attribute('open') open: string,
		public el: ElementRef,
		dispatcher: Dispatcher
		) {
			this.dispatcher = dispatcher;
			this.channel = channel;
			this.subscribeEvents();
    		this.classMap = { 'md-show': false };
			if (open) {
				setTimeout(this.openModal,0);
			}
	}

	subscribeEvents = () => {
		this.dispatcher.subscribe(this.channel,'open.modal', this.openModal);
    	this.dispatcher.subscribe(this.channel,'close.modal', this.closeModal);
		this.dispatcher.subscribe(this.channel,'toggle.modal', this.toggleModal);
	};
	openModal = (): void => {
		this.classMap['md-show'] = true;
	};
	closeModal = (): void => {
		this.classMap['md-show'] = false;
	};
	toggleModal = ():void => {
		this.classMap['md-show'] = !this.classMap['md-show'];
	};
	close = (): void =>  {
		this.dispatcher.publish(this.channel,'close.modal', null)
	};
	onDestroy() {
		this.dispatcher.unsubscribe(this.channel,'open.modal');
		this.dispatcher.unsubscribe(this.channel,'close.modal');
		this.dispatcher = null;
	}
	
}