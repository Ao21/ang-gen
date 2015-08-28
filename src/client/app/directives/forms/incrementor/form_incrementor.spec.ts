import {
	describe,
	it,
	expect,
	beforeEach
} from 'angular2/test_lib';

import {Dispatcher} from 'app/services/services';
import {BaseException} from 'angular2/src/facade/lang';
import {FormIncrementor} from 'app/directives/forms/incrementor/form_incrementor';

export function main(){
	describe('FormIncrementor', () => {
		let formIn;
		let dispatcherMock;
		let min;
		let max;
		let index;
		
		beforeEach(() => {
			dispatcherMock = new Dispatcher()
			min = 0;
			max = 3;
			index = 0;
			formIn = new FormIncrementor(dispatcherMock, min, max);
		})
		
		describe('minus', () => {
			it('should decrease index by one', () => {
				formIn.index = 3;
				formIn.minus();
				expect(formIn.index).toBe(2);
			}) 
			it('should not decrease below zero', () => {
				formIn.minus();
				expect(formIn.index).toBe(0);
			})
		})
		
		describe('plus', () => {
			it('should increase index by one', () => {
				formIn.plus();
				expect(formIn.index).toBe(1);
			}) 
			it('should not decrease below zero', () => {
				formIn.index = 3;
				formIn.plus();
				expect(formIn.index).toBe(3);
			})
		})
	})
}