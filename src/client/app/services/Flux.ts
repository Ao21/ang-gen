/// <reference path="../../../../typings/tsd.d.ts" />


import { Component, EventEmitter } from 'angular2/angular2';
import { Inject, Injectable, bind } from 'angular2/angular2';
import * as rx from 'rx';

@Injectable()
export class Dispatcher2 {
    public static productAdded:EventEmitter = new EventEmitter();
	
}


