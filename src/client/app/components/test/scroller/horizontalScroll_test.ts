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
import {HorizontalScroller, HorizontalScrollerRef, HorizontalScrollerConfig} from 'app/directives/scroller/horizontal_scroller';



@Component({
	selector: 'horizontal-scroll',
	viewBindings: [HorizontalScroller]
})

@View({
	directives: [angularDirectives, appDirectives],
	templateUrl: './app/components/test/scroller/horizontalScroll_test.html'
})

export class HorizontalScrollTest {
	
	constructor(hs: HorizontalScroller, public elementRef: ElementRef) {
		
	}
	open() {
		
	}
	close() {
		
	}

}

