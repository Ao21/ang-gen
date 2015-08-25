/// <reference path="../../../../typings/tsd.d.ts" />


import { Component } from 'angular2/angular2';
import { Inject, Injectable, bind } from 'angular2/angular2';
import * as flux from 'flux';

export class FluxService {
    // message:String;
    // static instance:FluxService;
    // static isCreating:Boolean = false;

    // constructor() {
    //     if (!FluxService.isCreating) {
    //         throw new Error("You can't call new in Singleton instances! Call FluxService.getInstance() instead.");
    //     }

    // }
    // static getInstance() {
    //     if (FluxService.instance == null) {
    //         FluxService.isCreating = true;
    //         FluxService.instance = new FluxService();
    //         FluxService.isCreating = false;
    //         FluxService.dispatcher = new flux.Dispatcher<any>()
            
    //     }

    //     return FluxService.instance;
    // }

    // checkDis() {
    //     console.log(FluxService.dispatcher);
    // }
}


