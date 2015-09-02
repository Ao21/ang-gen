/// <reference path="../../../../../../typings/tsd.d.ts" />

import {Component, View, LifecycleEvent, ElementRef} from 'angular2/angular2';
import {FORM_DIRECTIVES, FormBuilder, ControlGroup, Control} from "angular2/angular2";
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {HorizontalScroller, HorizontalScrollerRef, HorizontalScrollerConfig} from 'app/directives/scroller/horizontal_scroller';
import {DefaultUserPanel} from './panels/panels.modules'


import {ModalSlide} from 'app/directives/modal/modals.module';

@Component({
	selector: 'userDetails',
	viewBindings: [FormBuilder, HorizontalScroller],
	bindings: [],
	lifecycle: [LifecycleEvent.onDestroy]
})

@View({
	directives: [ angularDirectives, appDirectives, FORM_DIRECTIVES, ModalSlide ],
	templateUrl : './app/components/membership/user_details/user_details.html',
	styleUrls: ['./app/components/membership/user_details/user_details.css']

})

export class MembershipUserDetails {
	horizontalScroller: HorizontalScroller;
	horizontalRef: any;
	horizontalRefs:  any[] = [];
	horizontalScrollerConfig: HorizontalScrollerConfig;
	elementRef: ElementRef;
	scrollerCount: number;
	additionalUsers: any;
	form: ControlGroup;
	dispatcher: Dispatcher;
	count: number;
	initialState: [any];

	constructor(dispatcher: Dispatcher,fb: FormBuilder, hs: HorizontalScroller, elementRef: ElementRef){
		this.dispatcher = dispatcher;
		this.elementRef = elementRef;
		this.horizontalScroller = hs;
		this.horizontalScrollerConfig = new HorizontalScrollerConfig();
		
		this.count = 0;
		
		this.initialState = [
			{name:'defaultUser',component:DefaultUserPanel},
			{name:'defaultUser2',component:DefaultUserPanel},
		]
		this.activate();
	}

	activate = () => {
		this.horizontalScroller.loadModal(this.elementRef).
		then(cRef => {
			this.initialState.forEach(element => {
				this.horizontalScroller.loadComponent(element.component, element.name)
				.then(ref => {
					this.horizontalRefs.push(ref);
					ref.instance.horizontalRef = ref;
				});
			});
			
		})
	}

	addAdditionalUser = () => {
		this.horizontalScroller.loadComponent(DefaultUserPanel,'Form-'+this.count)
		.then(ref => {
			this.horizontalScroller.goToName('Form-'+this.count);
			this.horizontalRefs.push(ref);
			ref.instance.horizontalRef = ref;
			this.count++;
		});
		
	}
	
	goTo = () => {
		this.horizontalScroller.goToIndex(1);
		//this.horizontalScroller.goToEl('Form-2');
	}
	checkControls = () => {
	}

	onDestroy() {
		this.horizontalScroller.array.length = 0;
	}

}