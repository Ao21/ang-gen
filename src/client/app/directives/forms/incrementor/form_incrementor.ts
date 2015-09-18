import {Component, View, Attribute, EventEmitter} from 'angular2/angular2';
import {Dispatcher} from 'app/services/services';
import {appDirectives, angularDirectives} from 'app/directives/directives';

@Component({
	selector: 'form-incrementor',
	properties: ['image','index'],
	events: ['update']
})

@View({
	templateUrl: 'app/directives/forms/incrementor/form_incrementor.html',
	styleUrls: ['app/directives/forms/incrementor/form_incrementor.css']
})
export class FormIncrementor {
	index: number;
	min: number;
	max: number;
	update = new EventEmitter;
	
	constructor(
		@Attribute('min') min: number,
		@Attribute('max') max: number
		)
	{
		this.min = min;
		this.max = max;
		this.index = 0;
	}
	minus() {
		if(this.index > this.min){
			this.index--;
			debounce(this.update.next(this.index),250, false);
		}
	}
	plus() {
		if(this.index < this.max){
			this.index++;
			debounce(this.update.next(this.index),250, false);
			this.update.next(this.index);
		}
	}
}

function debounce(func, wait, immediate) {
	var timeout;
	return function() {
		var context = this, args = arguments;
		var later = function() {
			timeout = null;
			if (!immediate) func.apply(context, args);
		};
		var callNow = immediate && !timeout;
		clearTimeout(timeout);
		timeout = setTimeout(later, wait);
		if (callNow) func.apply(context, args);
	};
};