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
import {FormAdditionalUser, SimpleDialogComponent} from 'app/directives/forms/additional_user/form_additional_user';

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
		this.horizontalScroller.loadComponent(FormAdditionalUser)
			.then(ref => {
				this.horizontalRef = ref;
				ref.instance.horizontalRef = ref;
				ref.instance.numCoconuts = 21;
				console.log(ref);

			});
	}

	close() {
		//this.horizontalScrollerRef.close();
	}

}

