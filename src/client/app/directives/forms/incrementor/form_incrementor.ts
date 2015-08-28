import {Component, View, Attribute} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'form-incrementor',
	properties: ['image','index']
})

@View({
	templateUrl: 'app/directives/forms/incrementor/form_incrementor.html',
	styleUrls: ['app/directives/forms/incrementor/form_incrementor.css']
})
export class FormIncrementor {
	index: number;
	min: number;
	max: number;
	
	constructor(
		public dispatcher: Dispatcher, 
		@Attribute('min') min: number,
		@Attribute('max') max: number
		)
	{
		this.min = min;
		this.max = max;
		console.log(max);
		this.index = 0;
	}
	minus() {
		if(this.index > this.min){
			this.index--;
		}
	}
	plus() {
		if(this.index < this.max){
			this.index++;
		}
	}
}