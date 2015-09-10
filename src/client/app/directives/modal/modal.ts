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
export class Modal {
	componentLoader: DynamicComponentLoader;
	domRenderer: DomRenderer;

	constructor(loader: DynamicComponentLoader, domRenderer: DomRenderer) {
		this.componentLoader = loader;
		this.domRenderer = domRenderer;

	}

	open(
		type: Type,
		elementRef: ElementRef,
		options: MdDialogConfig = null
		): any {

		var config = isPresent(options) ? options : new MdDialogConfig();

		var dialogRef = new MdDialogRef();
		var bindings = Injector.resolve([bind(MdDialogRef).toValue(dialogRef)]);

		var backdropRefPromise = this._openBackdrop(elementRef, bindings);

		return this.componentLoader.loadNextToLocation(MdDialogRef, elementRef)
			.then(containerRef => {
				var dialogElement = containerRef.location.nativeElement;
				DOM.appendChild(DOM.query('body'), dialogElement);
				if (isPresent(config.width)) {
					DOM.setStyle(dialogElement, 'width', config.width);
				}
				if (isPresent(config.height)) {
					DOM.setStyle(dialogElement, 'height', config.height);
				}
				dialogRef.containerRef = containerRef;

				return this.componentLoader.loadNextToLocation(type, containerRef.instance.contentRef, bindings)
					.then(contentRef => {
						dialogRef.contentRef = contentRef;
						containerRef.instance.dialogRef = dialogRef;
						backdropRefPromise.then(backdropRef => {
                  			dialogRef.whenClosed.then((_) => { backdropRef.dispose(); });
                		});

						 return dialogRef;
					})
			})

	}

	/** Loads the dialog backdrop (transparent overlay over the rest of the page). */
  _openBackdrop(elementRef: ElementRef, bindings: any): any {
    return this.componentLoader.loadNextToLocation(MdBackdrop, elementRef, bindings)
        .then((componentRef) => {
          var backdropElement = componentRef.location.nativeElement;
          DOM.addClass(backdropElement, 'md-backdrop');
          DOM.appendChild(DOM.query('body'), backdropElement);
          return componentRef;
        });
  }

  alert(message: string, okMessage: string):any {
    throw 'Not implemented';
  }

  confirm(message: string, okMessage: string, cancelMessage: string):any {
    throw 'Not implemented';
  }
}


export class MdDialogConfig {
	width: string;
	height: string;

	constructor() {
		// Default configuration.
		this.width = null;
		this.height = null;
	}
}


@Component({
	selector: 'md-dialog-container',
	host: {
		'class': 'md-dialog',
		'tabindex': '0',
		'(body:^keydown)': 'documentKeypress($event)',
	},
})
@View({
	encapsulation: ViewEncapsulation.NONE,
	templateUrl: '',
	directives: [forwardRef(() => MdDialogContent)]
})

class MdDialogContainer {
	// Ref to the dialog content. Used by the DynamicComponentLoader to load the dialog content.
	contentRef: ElementRef;

	// Ref to the open dialog. Used to close the dialog based on certain events.
	dialogRef: MdDialogRef;

	constructor() {
		this.contentRef = null;
		this.dialogRef = null;
	}

	wrapFocus() {
		// Return the focus to the host element. Blocked on #1251.
	}
}

/**
 * Reference to an opened dialog.
 */
export class MdDialogRef {
	// Reference to the MdDialogContainer component.
	containerRef: ComponentRef;

	// Reference to the Component loaded as the dialog content.
	_contentRef: ComponentRef;

	// Whether the dialog is closed.
	isClosed: boolean;

	// Deferred resolved when the dialog is closed. The promise for this deferred is publicly exposed.
	whenClosedDeferred: any;

	// Deferred resolved when the content ComponentRef is set. Only used internally.
	contentRefDeferred: any;

	constructor() {
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

	/** Gets the component instance for the content of the dialog. */
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


	/** Gets a promise that is resolved when the dialog is closed. */
	get whenClosed(): any {
		return this.whenClosedDeferred.promise;
	}
	
	move() {

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

@Directive({
	selector: 'md-dialog-content',
})
class MdDialogContent {
	constructor( @Host() @SkipSelf() dialogContainer: MdDialogContainer, elementRef: ElementRef) {
		dialogContainer.contentRef = elementRef;
	}
}


/** Component for the dialog "backdrop", a transparent overlay over the rest of the page. */
@Component({
  selector: 'md-backdrop',
  host: {
    '(click)': 'onClick()',
  },
})
@View({template: '', encapsulation: ViewEncapsulation.NONE})
class MdBackdrop {
  dialogRef: MdDialogRef;

  constructor(dialogRef: MdDialogRef) {
    this.dialogRef = dialogRef;
  }

  onClick() {
    // TODO(jelbourn): Use MdDialogConfig to capture option for whether dialog should close on
    // clicking outside.
    this.dialogRef.close();
  }
}