import { Inject, Attribute, Component, View, ViewEncapsulation, NgFor, ElementRef, NgClass } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';



@Component({
	selector: 'modal-slide',
	properties: ['channel', 'classMap'],
	bindings: [
		Dispatcher
	]
})

@View({
	templateUrl: 'app/directives/modal/modal_slide.html',
	directives: [NgClass],
	styleUrls: ['app/directives/modal/modal_slide.css'],

})

export class ModalSlide {
	data: any;
	channel: string;
	classMap: any;
	title: string;
	contents: any;
	
	constructor(
		@Attribute('channel') channel: string,
		@Attribute('open') open: string,
		public el: ElementRef,
		public dispatcher: Dispatcher
		) {
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
	}
	openModal = (): void => {
		this.classMap['md-show'] = true;
	}
	closeModal = (): void => {
		this.classMap['md-show'] = false;
	}
	close = (): void =>  {
		console.log(this.el.renderView);
		this.dispatcher.publish(this.channel,'close.modal', null)

	}
}