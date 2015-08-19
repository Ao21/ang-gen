/// <reference path="../../../../typings/tsd.d.ts" />

import { Inject, Component, View, ViewEncapsulation, NgFor } from 'angular2/angular2';

@Component({
	selector: 'top-nav',
	properties: ['title']
})

@View({
	templateUrl: 'app/layout/topNav.html'
})

export class TopNav {
	constructor() {
		
	}
}