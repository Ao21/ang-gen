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
import {FormAdditionalUser, SimpleDialogComponent} from 'app/directives/forms/additional_user/form_additional_user';



@Component({
	selector: 'horizontal-scroll',
	viewBindings: [HorizontalScroller]
})

@View({
	directives: [angularDirectives, appDirectives],
	templateUrl: './app/components/test/horizontalScroll.html'
})

export class HorizontalScroll {
	horizontalScroller: HorizontalScroller;
	horizontalRef: any;
	horizontalRefs:  any[] = [];
	horizontalScrollerConfig: HorizontalScrollerConfig;
	count: number;

	constructor(hs: HorizontalScroller, public elementRef: ElementRef) {
		this.horizontalScroller = hs;
		this.horizontalScrollerConfig = new HorizontalScrollerConfig();
		this.horizontalScroller.loadModal(this.elementRef);
		this.count = 0;
	}
	open() {
		this.horizontalScroller.loadComponent(FormAdditionalUser,'Form-'+this.count)
			.then(ref => {
				this.horizontalRefs.push(ref);
				ref.instance.horizontalRef = ref;
				ref.instance.numCoconuts = 21;

			});
		this.count++;
	}
	close() {
		this.horizontalScroller.goToName('Form-2');
	}

}

