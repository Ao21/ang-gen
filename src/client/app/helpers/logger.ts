/// <reference path="../../../../typings/tsd.d.ts" />

/*
 * Angular 2
 */
import {Injectable} from 'angular2/angular2';

@Injectable() class Logger {
	_names: Array<string>;
	
	constructor() {
	}
	
	error(message: string, data:any, title: string) {
		toastr.error(message, title);
		console.log('Error: '+ message,data)
	}
	info(message: string, data:any, title: string) {
		toastr.info(message, title);
		console.log('Info: '+ message,data)
	}
	success(message: string, data:any, title: string) {
		toastr.success(message, title);
		console.log('Success: '+ message,data)
	}
	warning(message: string, data:any, title: string) {
		toastr.warning(message, title);
		console.log('Warning: '+ message,data)
	}
	
}

export { Logger }