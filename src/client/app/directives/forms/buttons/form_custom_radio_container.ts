import { Inject, Attribute, Component, View, Query, QueryList, NgFor, ElementRef, NgClass, FORM_DIRECTIVES, EventEmitter, LifecycleEvent } from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

import {FormCustomRadio} from './form_custom_radio';

@Component({
    selector: 'form-custom-radio-container'
})

@View({
  templateUrl: 'app/directives/forms/buttons/form_custom_radio_container.html',
  directives: []
})

export class FormCustomRadioContainer {

	constructor(){
	}
	
	onChange() {
		//console.log('changed');
	}
}
