/// <reference path="../../../../typings/tsd.d.ts" />


import { Component } from 'angular2/angular2';
import { Inject, Injectable, bind } from 'angular2/angular2';
import * as Postal from 'postal';

export class Dispatcher {
	static instance: Dispatcher;
	static isCreating: Boolean = false;

	constructor() {
		if (!Dispatcher.isCreating) {
			throw new Error("You can't call new in Singleton instances! Call Dispatcher.getInstance() instead.");
		}
	}

	static getInstance() {
		if (Dispatcher.instance == null) {
			Dispatcher.isCreating = true;
			Dispatcher.instance = new Dispatcher();
			Dispatcher.isCreating = false;
		}
		return Dispatcher.instance;
	}

	subscribe(
		channel: string,
		topic: string,
		callback: (data: any, msg: any) => any) {
			postal.subscribe({
				channel: channel,
				topic: topic,
				callback: callback
			});

	}

	publish(
		channel: string,
		topic: string,
		data: any): void {
		postal.publish({
			channel: channel,
			topic: topic,
			data: data
		});
	}

	subscriptions(): void {
		let results: any = postal.getSubscribersFor();
		console.log(results);
	}

	unsubscribeAll(): void {
		postal.unsubscribeFor();
	}

	unsubscribe(channel: string, topic: string): void {
		postal.unsubscribeFor({
			channel: channel,
			topic: topic
		});
	}


}


