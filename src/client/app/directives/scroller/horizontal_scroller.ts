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
export class HorizontalScroller {
	componentLoader: DynamicComponentLoader;
	domRenderer: DomRenderer;
	containerElement: any;
    horizontalRef: HorizontalScrollerRef;
	array : HorizontalScrollerArray;
    bindings: any;
	containerRef: any;

	constructor(loader: DynamicComponentLoader, domRenderer: DomRenderer) {
		this.componentLoader = loader;
		this.domRenderer = domRenderer;
		this.array = new HorizontalScrollerArray()

        
	}


	loadModal = (elementRef: ElementRef): any => {
		return this.componentLoader.loadNextToLocation(HorizontalScrollerContainer, elementRef)
			.then(containerRef => {
				var containerElement = containerRef.location.nativeElement;
				console.log(DOM.query('.md-horizontal'))
				DOM.appendChild(DOM.query('body'), containerElement);
				this.containerRef = containerRef;

			})
	}
    loadComponent = (type: Type, name?: string): any => {
		
		this.horizontalRef = this.array.add(new HorizontalScrollerRef, name);
		this.horizontalRef.containerRef = this.containerRef;
		this.bindings = Injector.resolve([bind(this.horizontalRef).toValue(this.horizontalRef)])
		return this.componentLoader.loadIntoLocation(type, this.horizontalRef.containerRef.location,'children',this.bindings)
		.then(contentRef => {
			var contentEl = contentRef.location.nativeElement
			var containerEl = this.horizontalRef.containerRef.location.nativeElement;
			
			DOM.setStyle(DOM.parentElement(contentEl), 'width', containerEl.offsetWidth);
			DOM.setStyle(DOM.parentElement(contentEl), 'height', containerEl.offsetHeight);
			var amount = this.horizontalRef.index * 100;
			DOM.setStyle(contentEl, 'transform', `translateX(${amount}%)`);
			
			this.horizontalRef.contentRef = contentRef;
			return this.horizontalRef;
		})
    }
	
	goToEl(name:string) {
		var el: any = _.find(this.array.contents,{name:name})
		this.horizontalRef.containerRef.instance.move(el.index);
	}
	
	


}


export class HorizontalScrollerConfig {

}

export class HorizontalScrollerArray {
	contents: any;
	count: number;
	
	constructor() {
		this.count = 0;
		this.contents = {};
	}
	
	get(id) {
		return this.contents[id]
	}
	
	add = (value, name?) => {
		this.contents[this.count] = value;
		if (name){
			this.contents[this.count].name = name;
		}
		this.contents[this.count].contents = this;
		
		this.contents[this.count].index = this.count;
		this.count++;
		console.log(this.contents)
		return this.contents[this.count - 1];

	}
	
}

export class HorizontalScrollerRef {

	containerRef: ComponentRef;
	isClosed: boolean;
	_contentRef: ComponentRef;
	whenClosedDeferred: any;
	contentRefDeferred: any;
	index: number;
	contents: any;

	constructor() {
		
		this.contents = {};
		this._contentRef = null;
		this.containerRef = null;
		this.isClosed = false;
		this.index = null;
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
	
	goTo(amount:number){
		this.containerRef.instance.move(1);
	}
	
	goToEl(name:string) {
		var el: any = _.find(this.contents.contents,{name:name})
		this.containerRef.instance.move(el.index);
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
	selector: 'horizontal-scroller-container',
	host: {
		'class': 'horizontal-scroller',
		'tabindex': '0'
	},
})
@View({
	styleUrls: ['app/directives/scroller/horizontal_scroller.css'],
	templateUrl: 'app/directives/scroller/horizontal_scroller.html',
	directives: [forwardRef(() => HorizontalScrollerContent)]
})
class HorizontalScrollerContainer {
	// Ref to the dialog content. Used by the DynamicComponentLoader to load the dialog content.
	contentRef: ElementRef;

	// Ref to the open dialog. Used to close the dialog based on certain events.
	horizontalRef: HorizontalScrollerRef;

	constructor() {
		this.contentRef = null;
		this.horizontalRef = null;
	}
	
	move(index:any){
		index = index * 100;
		DOM.setStyle(this.contentRef.nativeElement, 'transform', `translateX(-${index}%)`);
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
	selector: 'horizontal-scroller-content'
})
class HorizontalScrollerContent {
	constructor( @Host() @SkipSelf() horizontalContainer: HorizontalScrollerContainer, elementRef: ElementRef) {
		horizontalContainer.contentRef = elementRef;
	}
}
