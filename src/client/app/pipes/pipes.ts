/// <reference path="../../../../typings/tsd.d.ts" />

import { PipeFactory, NullPipeFactory, Pipes } from 'angular2/change_detection';

import { FilterPipeFactory } from './filter.pipe';

export const filter: Array<PipeFactory> = [
	new FilterPipeFactory(),
	new NullPipeFactory()
];

export var appPipes = [
  Pipes.extend({
    filter
  })
];
