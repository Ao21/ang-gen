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
DomRenderer,
LifecycleEvent
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
	containerWidth: number;

	constructor(loader: DynamicComponentLoader, domRenderer: DomRenderer) {
		this.componentLoader = loader;
		this.domRenderer = domRenderer;
		this.array = new HorizontalScrollerArray()
        
	}


	loadModal = (elementRef: ElementRef): any => {
		return this.componentLoader.loadNextToLocation(HorizontalScrollerContainer, elementRef)
			.then(containerRef => {
				var containerElement = containerRef.location.nativeElement;
				DOM.appendChild(DOM.query('horizontal-scroller'), containerElement);
				this.containerRef = containerRef;
				
				this.containerWidth = containerRef.location.nativeElement.offsetWidth;
				
				// Reset Position if already loaded
				DOM.setStyle(DOM.query('horizontal-scroller-content'), 'transform', `translateX(0px)`);

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
			
			
			// Relative Positioning Styling - Float the Elements Next to each other
			console.log(containerEl.offsetWidth)
			console.log(this.array.length)
			var containerWidth = containerEl.offsetWidth * this.array.length + 1;
			DOM.setStyle(DOM.parentElement(contentEl), 'width', containerWidth + 'px');
			DOM.setStyle(contentEl, 'width', this.containerWidth + 'px');
			// Make the Element Visible after the Container's been widened
			DOM.setStyle(contentEl, 'display', 'block');
			
			
			this.horizontalRef.contentRef = contentRef;
			return this.horizontalRef;
		})
    }
	
	
	goToIndex(index:number){
		var el: any = _.find(this.array.contents,{index:index})
		this.horizontalRef.containerRef.instance.move(el, this.containerWidth);
	}
	
	goToName(name:string) {
		var el: any = _.find(this.array.contents,{name:name})
		this.horizontalRef.containerRef.instance.move(el, this.containerWidth);
	}
	
	dispose(){
		this.array.destroy();
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
	
	get length():number {
		return Object.keys(this.contents).length

	}
	
	add = (value, name?) => {
		this.contents[this.count] = value;
		if (name){
			this.contents[this.count].name = name;
		}
		this.contents[this.count].contents = this;
		
		this.contents[this.count].index = this.count;
		this.count++;
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
	
	goToIndex(index:number){
		var el: any = _.find(this.contents.contents,{index:index})
		this.containerRef.instance.move(el);
	}
	
	goToName(name:string) {
		var el: any = _.find(this.contents.contents,{name:name})
		this.containerRef.instance.move(el);
	}
	
	/** Closes the dialog. This operation is asynchronous. */
	close(result: any = null) {
		this.contentRefDeferred.promise.then((_) => {
			if (!this.isClosed) {
				this.isClosed = true;
				this.containerRef.dispose();
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
	}
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
	
	move(el:any, containerWidth:number){
		let index = el.index * containerWidth;
		DOM.setStyle(this.contentRef.nativeElement, 'transform', `translateX(-${index}px)`);
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
