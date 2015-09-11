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

import {bind, Injectable, forwardRef, ResolvedBinding, Injector} from 'angular2/angular2';
import {Promise, PromiseWrapper, ObservableWrapper} from 'angular2/src/core/facade/async';
import {isPresent, Type} from 'angular2/src/core/facade/lang';
import {DOM} from 'angular2/src/core/dom/dom_adapter';
import {MouseEvent, KeyboardEvent} from 'angular2/src/core/facade/browser';

@Injectable()
export class ModalCreate {
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


export class MdDialogRef {}