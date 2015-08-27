import {
Component,
Directive,
View,
ViewEncapsulation,
Host,
SkipSelf,
ElementRef,
DynamicComponentLoader,
ComponentRef,
DomRenderer
} from 'angular2/angular2';


import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/di';
import {Promise, PromiseWrapper, ObservableWrapper} from 'angular2/src/facade/async';
import {isPresent, Type} from 'angular2/src/facade/lang';
import {DOM} from 'angular2/src/dom/dom_adapter';
import {MouseEvent, KeyboardEvent} from 'angular2/src/facade/browser';

@Injectable()
export class MdHorizontal {
	componentLoader: DynamicComponentLoader;
	domRenderer: DomRenderer;
	containerElement: any;
    horizontalRef: MdHorizontalRef;
	array : MdHorizontalArray;
    bindings: any;
	containerRef: any;

	constructor(loader: DynamicComponentLoader, domRenderer: DomRenderer) {
		this.componentLoader = loader;
		this.domRenderer = domRenderer;
		this.array = new MdHorizontalArray()

        
	}


	loadContainer = (elementRef: ElementRef): any => {
		return this.componentLoader.loadNextToLocation(MdHorizontalContainer, elementRef)
			.then(containerRef => {
				var containerElement = containerRef.location.nativeElement;
                console.log(DOM.query('body'), containerElement)
				DOM.appendChild(DOM.query('body'), containerElement);
				this.containerRef = containerRef;

			})
	}
    loadComponent = (type: Type): any => {
		
		this.horizontalRef = this.array.add(new MdHorizontalRef);
		this.horizontalRef.containerRef = this.containerRef;
		
		console.log(this.horizontalRef)
		
		this.bindings = Injector.resolve([bind(this.horizontalRef).toValue(this.horizontalRef)])
		
		return this.componentLoader.loadIntoLocation(type, this.horizontalRef.containerRef.location,'children',this.bindings)
		.then(contentRef => {
			this.horizontalRef.contentRef = contentRef;
			return this.horizontalRef;
		})
    }


}


export class MdHorizontalConfig {

}

export class MdHorizontalArray {
	contents: any;
	count: number;
	
	constructor() {
		this.count = 0;
		this.contents = {};
	}
	
	get(id) {
		return this.contents[id]
	}
	
	add(value) {
		this.contents[this.count] = value;
		this.count = this.count++
		return this.contents[this.count];
	}
	
}

export class MdHorizontalRef {

	containerRef: ComponentRef;
	isClosed: boolean;
	_contentRef: ComponentRef;
	whenClosedDeferred: any;
	contentRefDeferred: any;
	
	contents: any;

	constructor() {
		
		this.contents = {};
		this._contentRef = null;
		this.containerRef = null;
		this.isClosed = false;

		this.contentRefDeferred = PromiseWrapper.completer();
		this.whenClosedDeferred = PromiseWrapper.completer();
	}

	set contentRef(value: ComponentRef) {
		this._contentRef = value;
		this.contentRefDeferred.resolve(value);
	}
	

	/** Gets a promise that is resolved when the dialog is closed. */
	get whenClosed(): any {
		return this.whenClosedDeferred.promise;
	}
	
	get instance() {
		if (isPresent(this._contentRef)) {
			return this._contentRef.instance;
		}
		// The only time one could attempt to access this property before the value is set is if an
		// access occurs during
		// the constructor of the very instance they are trying to get (which is much more easily
		// accessed as `this`).
		throw "Cannot access dialog component instance *from* that component's constructor.";
	}
	
	/** Closes the dialog. This operation is asynchronous. */
	close(result: any = null) {
		this.contentRefDeferred.promise.then((_) => {
			if (!this.isClosed) {
				this.isClosed = true;
				console.log(this._contentRef.dispose())
				//this.containerRef.dispose();
				this.whenClosedDeferred.resolve(result);
			}
		});
	}
}


/**
 * Container for user-provided dialog content.
 */
@Component({
	selector: 'md-horizontal-container',
	host: {
		'class': 'md-horizontal',
		'tabindex': '0'
	},
})
@View({
	styleUrls: ['app/directives/modal/modal.css'],
	templateUrl: 'app/directives/modal/modal.html',
	directives: [forwardRef(() => MdHorizontalContent)]
})
class MdHorizontalContainer {
	// Ref to the dialog content. Used by the DynamicComponentLoader to load the dialog content.
	contentRef: ElementRef;

	// Ref to the open dialog. Used to close the dialog based on certain events.
	horizontalRef: MdHorizontalRef;

	constructor() {
		this.contentRef = null;
		this.horizontalRef = null;
	}
	
	wrapFocus() {
		// Return the focus to the host element. Blocked on #1251.
	}

}

/**
 * Simple decorator used only to communicate an ElementRef to the parent MdDialogContainer as the
 * location
 * for where the dialog content will be loaded.
 */
@Directive({
	selector: 'md-horizontal-content',
})
class MdHorizontalContent {
	constructor( @Host() @SkipSelf() horizontalContainer: MdHorizontalContainer, elementRef: ElementRef) {
		horizontalContainer.contentRef = elementRef;
	}
}
