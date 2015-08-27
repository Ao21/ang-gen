import {
bootstrap,
ElementRef,
ComponentRef,
Component,
View,
ViewEncapsulation,
Directive
} from 'angular2/angular2';
import {RouterOutlet, RouteConfig, RouterLink} from 'angular2/router';

import {appDirectives, angularDirectives} from 'app/directives/directives';

import {MdHorizontal, MdHorizontalRef, MdHorizontalConfig} from 'app/directives/modal/modal.me'

@Component({
	selector: 'horizontal-scroll',
	viewBindings: [MdHorizontal]
})

@View({
	directives: [angularDirectives, appDirectives],
	templateUrl: './app/components/test/horizontalScroll.html'
})

export class HorizontalScroll {
	horizontalScroller: MdHorizontal;
	elementRef: ElementRef;
	horizontalRef: any;
	horizontalScrollerConfig: MdHorizontalConfig;

	constructor(mdHorizontal: MdHorizontal, elementRef: ElementRef) {
		this.horizontalScroller = mdHorizontal;
		this.elementRef = elementRef;
		this.horizontalScrollerConfig = new MdHorizontalConfig();
		this.horizontalScroller.loadContainer(this.elementRef);

	}

	open() {
		this.horizontalScroller.loadComponent(SimpleDialogComponent)
			.then(ref => {
				this.horizontalRef = ref;
				ref.instance.horizontalRef = ref;
				ref.instance.numCoconuts = 777;

			});
	}

	close() {
		//this.horizontalScrollerRef.close();
	}

}

@Component({
	selector: 'simple-dialog',
	properties: ['numCoconuts'],
})
@View({
	encapsulation: ViewEncapsulation.NONE,
	template: `
    <h2>This is the dialog content</h2>
    <p>There are {{numCoconuts}} coconuts.</p>
    <p>Return: <input (input)="updateValue($event)"></p>
    <button type="button" (click)="done()">Done</button>
  `
})
class SimpleDialogComponent {
	numCoconuts: number;
	horizontalRef: MdHorizontalRef;
	toReturn: string;
	
	constructor() {
		this.numCoconuts = 0;
		this.toReturn = '';

	}

	updateValue(event) {
		
	}

	done() {
		this.horizontalRef.close(this.toReturn);
	}
}
