/// <reference path="../../../../typings/tsd.d.ts" />

import {
  isBlank,
  isString,
  isArray,
  StringWrapper,
  BaseException,
  CONST
} from 'angular2/src/facade/lang';
import {WrappedValue, Pipe, PipeFactory} from 'angular2/angular2';
import {ChangeDetectorRef} from 'angular2/angular2';

export class FilterPipe implements Pipe {
	static supportsObj(obj: any): boolean { return isArray(obj) }
	supports(obj: any): boolean { return FilterPipe.supportsObj(obj); }
	transform(value: any, args: List<any> = null): any {
    
    if (isBlank(args) || args.length == 0) {
      throw new BaseException('filter pipe requires one argument');
    }
		return _.filter(value, args[0]);
	}
	onDestroy(): void {}	
}

@CONST()
export class FilterPipeFactory implements PipeFactory {
  supports(obj: any): boolean { return FilterPipe.supportsObj(obj); }
  create(cdRef: ChangeDetectorRef): Pipe { return new FilterPipe(); }
}


export var addon = [ new FilterPipeFactory() ];
