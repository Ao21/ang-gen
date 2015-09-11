import { Inject, Attribute, Component, View, NgFor, ElementRef, NgClass, FORM_DIRECTIVES, EventEmitter } from 'angular2/angular2';
import {appDirectives, angularDirectives} from 'app/directives/directives';


@Component({
    selector: 'form-custom-radio',
	properties: ['group','value','icon', 'checked', 'classMap'],
	events: ['update']
})

@View({
  templateUrl: 'app/directives/forms/buttons/form_custom_radio.html',
  styleUrls: ['app/directives/forms/buttons/form_custom_radio.css'],
	directives: [FORM_DIRECTIVES, NgClass]
})



export class FormCustomRadio {
	checked: string;
	group: string;
	active: boolean;
	dispatcher: any;
	update = new EventEmitter();

	constructor(
		public el: ElementRef,
		@Attribute('checked') checked: Boolean, 
		@Attribute('group') group: string,
		@Attribute('class') public initialClasses: any ) 
		{
			this.group = group;
			this.active = false;
			
			if (checked) {
				this.check();
			}
			
		}


	check() {
		//Hack until they sort out querying
		$(this.el.nativeElement).parent().find('.button__radio--div').removeClass('active')
			
		this.initialClasses = {'active': !this.active};
		this.checked == 'checked' ? 'checked' : '';
		this.update.next('updated');


	};
}
