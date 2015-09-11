import {describe, it, expect } from 'angular2/test_lib';
import { DOM } from 'angular2/src/core/dom/dom_adapter';
import { ObservableWrapper } from 'angular2/src/core/facade/async';
import {
	Injector,
	bind,
	Component,
	View,
	
} from 'angular2/angular2';

import {
	MockBackend,
	BaseRequestOptions,
	Http
} from 'angular2/http';

export function main () {
	describe('Core', () => {
		it('should exist', () => {
			expect(true).toBe(true);
		})
	})
}